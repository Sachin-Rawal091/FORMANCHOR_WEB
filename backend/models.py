from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class ContactSubmissionInput(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full Name of the contact")
    email: EmailStr = Field(..., description="Email address for replies")
    subject: str = Field(..., min_length=2, max_length=150, description="Inquiry subject select option")
    message: str = Field(..., min_length=10, max_length=2000, description="Submission query body")
    honeypot: Optional[str] = Field(None, description="Hidden field to prevent automated bot spam")

class ContactSubmissionDB(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: str
    user_agent: str

class SubscribeInput(BaseModel):
    email: EmailStr = Field(..., description="Email address to subscribe")

class SubscriberDB(BaseModel):
    email: EmailStr
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: str
