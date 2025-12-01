from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Path, Query, status

from api.dependencies import get_mongo_client
from core.config import settings
from core.schemas.store import ProductDetailResponse, ProductListResponse

router = APIRouter(tags=["Products"])


@router.get(
    "",
    response_model=ProductListResponse,
    summary="Public catalog endpoint with filters, sorts, and cursor pagination",
)
async def list_products(
    category: Optional[str] = Query(None),
    brand: Optional[str] = Query(None),
    min_price: Optional[int] = Query(None),
    max_price: Optional[int] = Query(None),
    availability: Optional[str] = Query(None),
    sort: str = Query("relevance"),
    cursor: Optional[str] = Query(None),
    limit: int = Query(20, ge=1, le=60),
    mongo=Depends(get_mongo_client),
):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Product listing pipeline is not implemented yet.",
    )


@router.get(
    "/{slug_or_sku}",
    response_model=ProductDetailResponse,
    summary="Return a product detail page payload",
)
async def get_product_detail(slug_or_sku: str = Path(...), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Product detail lookup is not implemented yet.",
    )

