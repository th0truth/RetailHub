from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, EmailStr, Field

from .etc import PyObjectId


class Category(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str
    slug: str
    parent_id: Optional[PyObjectId] = None
    order: Optional[int] = 0
    icon: Optional[str] = None
    seo: Dict[str, Any] = {}


class CategoryTreeResponse(BaseModel):
    items: List[Category]


class Brand(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str
    slug: str
    logo_url: Optional[str] = None
    description: Optional[str] = None
    country: Optional[str] = None


class Price(BaseModel):
    amount: int
    currency: str = "EUR"
    vat_included: bool = True


class Stock(BaseModel):
    qty: int
    status: str
    warehouse_id: Optional[PyObjectId] = None


class ProductSummary(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    sku: str
    slug: str
    title: str
    short_description: Optional[str] = None
    price: Optional[Price] = None
    stock: Optional[Stock] = None
    brand_id: Optional[PyObjectId] = None
    category_ids: List[PyObjectId] = []
    tags: List[str] = []
    rating: Optional[float] = None


class ProductListResponse(BaseModel):
    items: List[ProductSummary]
    next_cursor: Optional[str] = None
    facets: Dict[str, Any] = {}


class ProductDetail(ProductSummary):
    long_description: Optional[str] = None
    specs: Dict[str, Any] = {}
    attributes: Dict[str, Any] = {}
    price_history: List[Dict[str, Any]] = []
    images: List[Dict[str, Any]] = []
    files: List[Dict[str, Any]] = []
    related_ids: List[PyObjectId] = []
    metadata: Dict[str, Any] = {}


class ProductDetailResponse(BaseModel):
    product: ProductDetail


class SearchResponse(BaseModel):
    query: str
    results: List[ProductSummary]


class AutocompleteSuggestion(BaseModel):
    label: str
    value: str
    type: str = "product"


class AutocompleteResponse(BaseModel):
    query: str
    suggestions: List[AutocompleteSuggestion]


class FastOrderOrigin(BaseModel):
    type: str
    ref: Optional[str] = None


class FastOrderCustomer(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    company: Optional[str] = None


class FastOrderItem(BaseModel):
    product_id: PyObjectId
    sku: str
    qty: int = Field(default=1, ge=1)


class FastOrderRequest(BaseModel):
    origin: FastOrderOrigin
    customer: FastOrderCustomer
    items: List[FastOrderItem]
    comment: Optional[str] = None
    extra: Dict[str, Any] = {}


class FastOrderResponse(BaseModel):
    order_number: str
    status: str
    order_id: PyObjectId


class CartItem(BaseModel):
    product_id: PyObjectId
    sku: str
    qty: int = Field(default=1, ge=1)


class CartPayload(BaseModel):
    items: List[CartItem]


class CheckoutRequest(BaseModel):
    cart_id: str
    customer: FastOrderCustomer
    delivery: Dict[str, Any]
    payment: Dict[str, Any]


class CheckoutResponse(BaseModel):
    order_number: str
    status: str
    payment_required: bool = False


class HomepageBlock(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    type: str
    payload: Dict[str, Any]
    order: int = 0
    active: bool = True


class HomepageBlocksResponse(BaseModel):
    items: List[HomepageBlock]


class Service(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    title: str
    summary: str
    deliverables: List[str] = []
    lead_time: Optional[str] = None
    price_model: Optional[str] = None


class ServiceListResponse(BaseModel):
    items: List[Service]


class ServiceRequest(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    service: str
    preferred_date: Optional[datetime] = None
    comment: Optional[str] = None


class BlogArticle(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    slug: str
    title: str
    author: Optional[str] = None
    published_at: Optional[datetime] = None
    hero_image: Optional[str] = None
    content: Optional[str] = None
    tags: List[str] = []


class BlogListResponse(BaseModel):
    items: List[BlogArticle]
    next_cursor: Optional[str] = None


class CompanyInfo(BaseModel):
    about: str
    mission: Optional[str] = None
    team: List[Dict[str, Any]] = []
    partners: List[Dict[str, Any]] = []
    service_centers: List[Dict[str, Any]] = []
    certifications: List[Dict[str, Any]] = []


class ContactInfo(BaseModel):
    map_embed_url: Optional[str] = None
    phones: List[str] = []
    emails: List[str] = []
    working_hours: Dict[str, str] = {}
    address: Optional[str] = None


class ContactForm(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    department: Optional[str] = None
    message: str


class CallbackRequest(BaseModel):
    name: str
    phone: str


class ContactSubmissionResponse(BaseModel):
    reference: str
    status: str = "received"


class AccountOrder(BaseModel):
    order_number: str
    status: str
    total: int
    currency: str = "EUR"
    created_at: datetime


class AccountOrderListResponse(BaseModel):
    items: List[AccountOrder]


class FavoritePayload(BaseModel):
    product_id: PyObjectId


class ComparePayload(BaseModel):
    product_ids: List[PyObjectId]


