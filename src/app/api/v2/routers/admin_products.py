from fastapi import APIRouter, Depends, HTTPException, Path, status

from api.dependencies import get_current_user, get_mongo_client
from core.config import settings
from core.schemas.products import ProductItem

router = APIRouter(prefix="/admin/products", tags=["Admin Products"])


@router.get("", summary="List products for admin")
async def admin_list_products(current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin product listing not implemented yet.",
    )


@router.post("", summary="Create a new product", response_model=ProductItem, status_code=status.HTTP_201_CREATED)
async def admin_create_product(payload: ProductItem, current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    payload
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin product creation not implemented yet.",
    )


@router.put("/{product_id}", summary="Update an existing product")
async def admin_update_product(
    product_id: str = Path(...),
    payload: ProductItem = None,
    current_user=Depends(get_current_user),
    mongo=Depends(get_mongo_client),
):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    product_id
    payload
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin product update not implemented yet.",
    )


@router.delete("/{product_id}", summary="Archive or delete product")
async def admin_delete_product(product_id: str = Path(...), current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    product_id
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin product delete not implemented yet.",
    )

