from fastapi import APIRouter, Depends, HTTPException, Path, status

from api.dependencies import get_current_user, get_mongo_client
from core.config import settings

router = APIRouter(prefix="/admin/users", tags=["Admin Users"])


@router.get("", summary="List users with filters")
async def admin_list_users(current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin user listing not implemented yet.",
    )


@router.put("/{user_id}/roles", summary="Update user roles")
async def admin_update_user_roles(
    user_id: str = Path(...),
    payload: dict | None = None,
    current_user=Depends(get_current_user),
    mongo=Depends(get_mongo_client),
):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    user_id
    payload
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin role update not implemented yet.",
    )

