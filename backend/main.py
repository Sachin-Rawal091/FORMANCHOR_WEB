import os
import logging
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from fastapi import FastAPI, Request, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from database import submissions_collection, check_database_connection, subscribers_collection
from models import ContactSubmissionInput, ContactSubmissionDB, SubscribeInput, SubscriberDB
from email_service import send_contact_notification

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("formanchor-backend")

def get_client_ip(request: Request) -> str:
    """Extract client IP address accounting for reverse proxies (X-Forwarded-For)."""
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

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

# Configure CORS dynamically via ALLOWED_ORIGINS env variable
raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,https://formanchor-web-three.vercel.app,https://www.formanchor.online,https://formanchor.online"
)
allowed_origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^https:\/\/.*\.vercel\.app$",
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
        "timestamp": datetime.now(timezone.utc).isoformat(),
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
    client_ip = get_client_ip(request)
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
    client_ip = get_client_ip(request)

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
