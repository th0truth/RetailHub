from fastapi import APIRouter

from .routers import (
    account,
    admin_homepage,
    admin_imports,
    admin_orders,
    admin_products,
    admin_users,
    blog,
    catalog,
    checkout,
    company,
    contacts,
    fast_orders,
    homepage,
    products,
    search,
    services,
)

api_v2_router = APIRouter()

api_v2_router.include_router(catalog.router)
api_v2_router.include_router(products.router, prefix="/products")
api_v2_router.include_router(search.router)
api_v2_router.include_router(fast_orders.router)
api_v2_router.include_router(checkout.router)
api_v2_router.include_router(homepage.router)
api_v2_router.include_router(services.router)
api_v2_router.include_router(blog.router)
api_v2_router.include_router(company.router)
api_v2_router.include_router(contacts.router)
api_v2_router.include_router(account.router)
api_v2_router.include_router(admin_products.router)
api_v2_router.include_router(admin_orders.router)
api_v2_router.include_router(admin_homepage.router)
api_v2_router.include_router(admin_imports.router)
api_v2_router.include_router(admin_users.router)