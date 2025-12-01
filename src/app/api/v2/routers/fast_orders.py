from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import get_mongo_client, get_redis_client
from core.config import settings
from core.schemas.store import FastOrderRequest, FastOrderResponse

router = APIRouter(prefix="/orders", tags=["Fast Orders"])


@router.post(
    "/fast",
    status_code=status.HTTP_201_CREATED,
    response_model=FastOrderResponse,
    summary="Create a fast order directly from a product context.",
)
async def create_fast_order(request: FastOrderRequest, mongo=Depends(get_mongo_client), redis=Depends(get_redis_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    await redis.ping()
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Fast order creation will be delivered in the next iteration.",
    )

