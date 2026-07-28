import os
import html
import logging
import resend
from pathlib import Path
from dotenv import load_dotenv

# Setup logging
logger = logging.getLogger("formanchor-backend")

# Load environment variables
dotenv_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=dotenv_path, override=True)

# Initialize Resend
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
NOTIFICATION_EMAIL = os.getenv("NOTIFICATION_EMAIL")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY
else:
    logger.warning("RESEND_API_KEY is missing from environment. Emails will not be sent.")

def send_contact_notification(name: str, sender_email: str, subject: str, message_content: str):
    """
    Sends an email notification when a new contact form is submitted.
    Executed in a background thread to prevent blocking client requests.
    """
    if not RESEND_API_KEY or not NOTIFICATION_EMAIL:
        logger.info("Resend not configured. Skipping email notification.")
        return

    # Check if using the default Resend onboarding address
    from_address = "onboarding@resend.dev"
    # If you verify a domain in Resend later, you can change this to:
    # from_address = "FormAnchor Notifications <notifications@yourdomain.com>"

    try:
        logger.info(f"Sending email notification for submission from {name} ({sender_email}) with subject: {subject}...")
        
        # HTML escape user inputs to prevent XSS / HTML injection in email clients
        safe_name = html.escape(name)
        safe_email = html.escape(sender_email)
        safe_subject = html.escape(subject)
        safe_message = html.escape(message_content).replace('\n', '<br>')

        email_params = {
            "from": from_address,
            "to": NOTIFICATION_EMAIL,
            "subject": f"FormAnchor [{safe_subject}]: New Message from {safe_name}",
            "html": f"""
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> {safe_name}</p>
            <p><strong>Email:</strong> {safe_email}</p>
            <p><strong>Subject:</strong> {safe_subject}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left: 3px solid #5b8cff; padding-left: 12px; margin-left: 0; color: #555;">
                {safe_message}
            </blockquote>
            <hr style="border: 0; border-top: 1px solid #eee; margin-top: 24px;" />
            <p style="font-size: 11px; color: #888;">This email was sent automatically by the FormAnchor Web Showcase backend.</p>
            """
        }

        response = resend.Emails.send(email_params)
        logger.info(f"Email successfully sent! Message ID: {response.get('id')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email via Resend: {e}")
        return False
