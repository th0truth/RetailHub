from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import get_redis_client
from core.schemas.store import CartPayload, CheckoutRequest, CheckoutResponse

router = APIRouter(prefix="/checkout", tags=["Checkout"])


@router.post("/cart", summary="Create or replace a cart snapshot")
async def save_cart(payload: CartPayload, redis=Depends(get_redis_client)):
    await redis.ping()
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Cart persistence is not implemented yet.",
    )


@router.put("/cart", summary="Update an existing cart")
async def update_cart(payload: CartPayload, redis=Depends(get_redis_client)):
    await redis.ping()
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Cart updates are not implemented yet.",
    )


@router.post("", response_model=CheckoutResponse, summary="Full checkout workflow")
async def complete_checkout(payload: CheckoutRequest, redis=Depends(get_redis_client)):
    await redis.ping()
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Checkout processing is not implemented yet.",
    )

