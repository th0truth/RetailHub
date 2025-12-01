from fastapi import APIRouter, Depends, HTTPException, Path, status

from api.dependencies import get_current_user, get_mongo_client
from core.config import settings

router = APIRouter(prefix="/admin/imports", tags=["Admin Imports"])


@router.post("", status_code=status.HTTP_202_ACCEPTED, summary="Start a product import job")
async def admin_start_import(current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Import job submission not implemented yet.",
    )


@router.get("/{job_id}", summary="Check import job status")
async def admin_get_import_status(job_id: str = Path(...), current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    job_id
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Import job status check not implemented yet.",
    )

