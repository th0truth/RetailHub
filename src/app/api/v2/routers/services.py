from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import get_mongo_client
from core.config import settings
from core.schemas.store import ServiceListResponse, ServiceRequest

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("", response_model=ServiceListResponse, summary="List available services")
async def list_services(mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Services listing is not implemented yet.",
    )


@router.post("/request", summary="Submit a service request")
async def submit_service_request(payload: ServiceRequest, mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Service request submission is not implemented yet.",
    )

