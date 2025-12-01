from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import get_mongo_client, get_redis_client
from core.config import settings
from core.schemas.store import HomepageBlocksResponse

router = APIRouter(prefix="/homepage", tags=["Homepage"])


@router.get("/blocks", response_model=HomepageBlocksResponse, summary="Public homepage layout blocks")
async def list_homepage_blocks(mongo=Depends(get_mongo_client), redis=Depends(get_redis_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    await redis.ping()
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Homepage blocks endpoint is not implemented yet.",
    )

