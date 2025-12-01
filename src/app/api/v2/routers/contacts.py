from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import get_mongo_client, get_redis_client
from core.config import settings
from core.schemas.store import CallbackRequest, ContactForm, ContactInfo, ContactSubmissionResponse

router = APIRouter(prefix="/contacts", tags=["Contacts"])


@router.get("", response_model=ContactInfo, summary="Public contact information")
async def get_contact_info(mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Contact information endpoint is not implemented yet.",
    )


@router.post("", response_model=ContactSubmissionResponse, summary="Submit contact form")
async def submit_contact_form(payload: ContactForm, mongo=Depends(get_mongo_client), redis=Depends(get_redis_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    await redis.ping()
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Contact form submission is not implemented yet.",
    )


@router.post("/callback", response_model=ContactSubmissionResponse, summary="Request a callback")
async def request_callback(payload: CallbackRequest, mongo=Depends(get_mongo_client), redis=Depends(get_redis_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    await redis.ping()
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Callback requests are not implemented yet.",
    )

