from fastapi import APIRouter, Depends, HTTPException, status

from api.dependencies import get_current_user, get_mongo_client
from core.config import settings
from core.schemas.store import AccountOrderListResponse, ComparePayload, FavoritePayload

router = APIRouter(prefix="/account", tags=["Account"])


@router.get("/orders", response_model=AccountOrderListResponse, summary="List orders for the current user")
async def list_account_orders(current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Account order history not implemented yet.",
    )


@router.get("/favorites", summary="Return list of favorites for current user")
async def get_favorites(current_user=Depends(get_current_user)):
    current_user
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Favorites retrieval not implemented yet.",
    )


@router.post("/favorites", summary="Add product to favorites")
async def add_favorite(payload: FavoritePayload, current_user=Depends(get_current_user)):
    payload
    current_user
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Favorites update not implemented yet.",
    )


@router.post("/compare", summary="Persist compare list for current user")
async def update_compare(payload: ComparePayload, current_user=Depends(get_current_user)):
    payload
    current_user
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Compare list not implemented yet.",
    )

