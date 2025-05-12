from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.models.order import OrderStatus, PaymentMethod


class OrderItemBase(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)
    unit_price: float = Field(..., gt=0)


class OrderItemCreate(OrderItemBase):
    pass


class OrderItemUpdate(BaseModel):
    quantity: Optional[int] = Field(None, gt=0)


class OrderItemInDBBase(OrderItemBase):
    id: int
    order_id: int

    class Config:
        from_attributes = True


class OrderItem(OrderItemInDBBase):
    pass


class OrderBase(BaseModel):
    total_amount: float = Field(..., gt=0)
    status: OrderStatus = OrderStatus.PENDING
    payment_method: PaymentMethod = PaymentMethod.CASH
    shipping_address: str
    shipping_city: str
    shipping_postal_code: Optional[str] = None
    shipping_country: str
    contact_phone: str
    notes: Optional[str] = None


class OrderCreate(OrderBase):
    items: List[OrderItemCreate]


class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    payment_method: Optional[PaymentMethod] = None
    shipping_address: Optional[str] = None
    shipping_city: Optional[str] = None
    shipping_postal_code: Optional[str] = None
    shipping_country: Optional[str] = None
    contact_phone: Optional[str] = None
    notes: Optional[str] = None


class OrderInDBBase(OrderBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Order(OrderInDBBase):
    items: List[OrderItem] = []


class OrderWithUser(Order):
    user: "UserInfo"


class UserInfo(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True 