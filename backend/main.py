import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from datetime import datetime

from database import submissions_collection, check_database_connection, subscribers_collection
from models import ContactSubmissionInput, ContactSubmissionDB, SubscribeInput, SubscriberDB
from email_service import send_contact_notification

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("formanchor-backend")

# Initialize Rate Limiter
limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Verify database connection
    await check_database_connection()
    yield

# Create FastAPI application
app = FastAPI(
    title="FormAnchor API",
    description="Backend API for FormAnchor Web Showcase and Contact Submissions",
    version="1.0.0",
    lifespan=lifespan
)

# Attach Limiter to FastAPI
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS
# In production, specify the exact domain. For local development, allow all.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health", status_code=status.HTTP_200_OK)
async def health_check():
    """Verify backend and database connection status."""
    db_connected = await check_database_connection()
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": "connected" if db_connected else "disconnected"
    }

@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def submit_contact_form(payload: ContactSubmissionInput, request: Request, background_tasks: BackgroundTasks):
    """
    Handle contact submissions.
    Filters out spambots using honeypot detection and saves validated submissions to MongoDB.
    """
    # 1. Honeypot check: If the hidden honeypot field is filled, silently ignore
    # (spambots fill every input field, but humans cannot see this field in the UI)
    if payload.honeypot:
        logger.warning("Spambot detected via honeypot. Ignoring request.")
        # Return success to the bot so it thinks it succeeded and stops retrying
        return {
            "success": True,
            "message": "Submission received successfully."
        }

    # 2. Extract request metadata
    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")

    # 3. Create database entry model
    db_submission = ContactSubmissionDB(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        ip_address=client_ip,
        user_agent=user_agent
    )

    # 4. Save to MongoDB
    try:
        result = await submissions_collection.insert_one(db_submission.model_dump())
        logger.info(f"New contact submission stored: ID={result.inserted_id} from IP={client_ip}")

        # Trigger background email sending task
        background_tasks.add_task(
            send_contact_notification,
            db_submission.name,
            db_submission.email,
            db_submission.subject,
            db_submission.message
        )

        return {
            "success": True,
            "message": "Thank you! Your message has been received."
          }
    except Exception as e:
        logger.error(f"Error saving submission to database: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while saving your message. Please try again later."
        )

@app.post("/api/subscribe", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def subscribe_email(payload: SubscribeInput, request: Request, background_tasks: BackgroundTasks):
    """
    Handle email newsletter/updates subscription.
    Saves email to MongoDB and sends a background email notification.
    """
    client_ip = request.client.host if request.client else "unknown"

    # Check if already subscribed
    try:
        existing = await subscribers_collection.find_one({"email": payload.email})
        if existing:
            return {
                "success": True,
                "message": "You are already signed up! Thank you."
            }

        # Store new subscriber
        db_subscriber = SubscriberDB(
            email=payload.email,
            ip_address=client_ip
        )
        await subscribers_collection.insert_one(db_subscriber.model_dump())

        # Trigger background notification
        background_tasks.add_task(
            send_contact_notification,
            "Newsletter Subscription",
            payload.email,
            "Subscription Signup",
            f"A new user signed up for updates on the Install page: {payload.email}"
        )

        return {
            "success": True,
            "message": "Thank you! You have been successfully subscribed."
        }
    except Exception as e:
        logger.error(f"Error saving subscription to database: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while saving your subscription. Please try again later."
        )
