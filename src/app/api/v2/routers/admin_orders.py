from fastapi import APIRouter, Depends, HTTPException, Path, status

from api.dependencies import get_current_user, get_mongo_client
from core.config import settings

router = APIRouter(prefix="/admin/orders", tags=["Admin Orders"])


@router.get("", summary="Search orders with filters")
async def admin_list_orders(current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin order search not implemented yet.",
    )


@router.put("/{order_id}/status", summary="Update order status")
async def admin_update_order_status(
    order_id: str = Path(...),
    payload: dict | None = None,
    current_user=Depends(get_current_user),
    mongo=Depends(get_mongo_client),
):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    order_id
    payload
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin order status update not implemented yet.",
    )


@router.post("/{order_id}/email", summary="Resend order email")
async def admin_resend_order_email(order_id: str = Path(...), current_user=Depends(get_current_user)):
    current_user
    order_id
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin order email resend not implemented yet.",
    )

