from fastapi import APIRouter, Depends, HTTPException, Path, Query, status

from api.dependencies import get_mongo_client
from core.config import settings
from core.schemas.store import BlogArticle, BlogListResponse

router = APIRouter(prefix="/blog", tags=["Blog"])


@router.get("", response_model=BlogListResponse, summary="List blog/news items")
async def list_blog_articles(
    page_cursor: str | None = Query(None),
    limit: int = Query(10, ge=1, le=50),
    mongo=Depends(get_mongo_client),
):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Blog listing not implemented yet.",
    )


@router.get("/{slug}", response_model=BlogArticle, summary="Fetch a single blog entry")
async def get_blog_article(slug: str = Path(...), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Blog article retrieval not implemented yet.",
    )

