import os
import logging
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Setup logger
logger = logging.getLogger("formpilot-backend")
logger.setLevel(logging.INFO)

# Load environment variables from the .env file in the backend directory
dotenv_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=dotenv_path, override=True)

# Get MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "formpilot_db")


# Initialize motor client
logger.info(f"Connecting to MongoDB at {MONGO_URI}...")
client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000)
db = client[DB_NAME]
submissions_collection = db["submissions"]
subscribers_collection = db["subscribers"]

async def check_database_connection():
    """Verify that MongoDB is connected and reachable."""
    try:
        # The ping command is cheap and checks connection
        await db.command("ping")
        logger.info("Successfully connected to MongoDB.")
        return True
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        return False
