from fastapi import APIRouter, Depends, HTTPException, Path, status

from api.dependencies import get_current_user, get_mongo_client
from core.config import settings
from core.schemas.store import HomepageBlock, HomepageBlocksResponse

router = APIRouter(prefix="/admin/homepage", tags=["Admin Homepage"])


@router.get("/blocks", response_model=HomepageBlocksResponse, summary="List homepage blocks for admin")
async def admin_list_homepage_blocks(current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin homepage blocks listing not implemented yet.",
    )


@router.post("/blocks", response_model=HomepageBlock, status_code=status.HTTP_201_CREATED)
async def admin_create_homepage_block(payload: HomepageBlock, current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    payload
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin homepage block creation not implemented yet.",
    )


@router.put("/blocks/{block_id}", summary="Update a homepage block")
async def admin_update_homepage_block(
    block_id: str = Path(...),
    payload: HomepageBlock = None,
    current_user=Depends(get_current_user),
    mongo=Depends(get_mongo_client),
):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    block_id
    payload
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin homepage block update not implemented yet.",
    )


@router.delete("/blocks/{block_id}", summary="Delete or disable a block")
async def admin_delete_homepage_block(block_id: str = Path(...), current_user=Depends(get_current_user), mongo=Depends(get_mongo_client)):
    mongo.get_database(settings.MONGO_DATABASE)
    current_user
    block_id
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Admin homepage block deletion not implemented yet.",
    )

