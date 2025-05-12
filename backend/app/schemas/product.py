from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ProductImageBase(BaseModel):
    image_url: str
    is_primary: bool = False


class ProductImageCreate(ProductImageBase):
    pass


class ProductImageUpdate(BaseModel):
    image_url: Optional[str] = None
    is_primary: Optional[bool] = None


class ProductImageInDBBase(ProductImageBase):
    id: int
    product_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ProductImage(ProductImageInDBBase):
    pass


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    stock: int = Field(0, ge=0)
    discount_percent: float = Field(0, ge=0, le=100)
    image_url: Optional[str] = None
    is_active: bool = True
    category_id: int


class ProductCreate(ProductBase):
    images: Optional[List[ProductImageCreate]] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    stock: Optional[int] = Field(None, ge=0)
    discount_percent: Optional[float] = Field(None, ge=0, le=100)
    image_url: Optional[str] = None
    is_active: Optional[bool] = None
    category_id: Optional[int] = None


class ProductInDBBase(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Product(ProductInDBBase):
    images: List[ProductImage] = []


class ProductWithCategory(Product):
    category: "CategoryInfo"


class CategoryInfo(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True 