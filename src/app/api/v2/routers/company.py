from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import get_mongo_client
from core.config import settings
from core.schemas.store import CompanyInfo

router = APIRouter(prefix="/company", tags=["Company"])


@router.get("", response_model=CompanyInfo, summary="Company/About information")
async def get_company_profile(mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Company profile endpoint is not implemented yet.",
    )

