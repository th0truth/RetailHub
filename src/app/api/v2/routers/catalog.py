from fastapi import APIRouter, Depends, HTTPException, Path, status

from api.dependencies import get_mongo_client
from core.config import settings
from core.schemas.store import Category, CategoryTreeResponse

router = APIRouter(tags=["Catalog"])


@router.get(
    "/categories",
    response_model=CategoryTreeResponse,
    summary="Return the full category tree",
)
async def list_categories(mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Category listing will be implemented soon.",
    )


@router.get(
    "/categories/{slug}",
    response_model=Category,
    summary="Retrieve a single category with SEO metadata",
)
async def get_category(slug: str = Path(..., description="Category slug"), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=f"Category '{slug}' lookup is not implemented yet.",
    )

