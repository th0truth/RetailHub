from fastapi import APIRouter, Depends, HTTPException, Query, status

from api.dependencies import get_mongo_client, get_redis_client
from core.config import settings
from core.schemas.store import AutocompleteResponse, SearchResponse

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("", response_model=SearchResponse, summary="Full-text search across catalog")
async def search_products(
    q: str = Query(..., min_length=1, description="Search query"),
    limit: int = Query(20, ge=1, le=50),
    mongo=Depends(get_mongo_client),
):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
         status_code=status.HTTP_501_NOT_IMPLEMENTED,
         detail="Search pipeline is not implemented yet.",
    )


@router.get(
    "/autocomplete",
    response_model=AutocompleteResponse,
    summary="Fast autocomplete endpoint (<150ms target).",
)
async def autocomplete(
    q: str = Query(..., min_length=1),
    redis=Depends(get_redis_client),
):
    await redis.ping()
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Autocomplete suggestions are not implemented yet.",
    )

