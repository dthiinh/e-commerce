import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assests/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'
import LoginPrompt from '../LoginPrompt/LoginPrompt'

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, removeItemFromCart, resetCart, showLoginPrompt, proceedToCheckout } = useContext(ShopContext);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    const handlePromoCode = () => {
        if (promoCode === 'SALE20') {
            const discountAmount = getTotalCartAmount() * 0.2;
            setDiscount(discountAmount);
            alert('Mã giảm giá đã được áp dụng!');
        } else {
            alert('Mã giảm giá không hợp lệ');
            setDiscount(0);
        }
    }

    const handleCheckout = () => {
        proceedToCheckout(navigate);
    }

    return (
        <div className='cartitems'>
            {showLoginPrompt && <LoginPrompt />}
            
            <div className="cartitems-format-main cartitems-header">
                    <p>Sản phẩm</p>
                    <p>Tên sản phẩm</p>
                    <p>Size</p>
                    <p>Giá</p>
                    <p>Số lượng</p>
                    <p>Tổng</p>
                    <p>Xóa</p>
            </div>
            <hr />
            
            {Object.keys(cartItems).length === 0 ? (
                <div className="empty-cart">
                    <h2>Giỏ hàng trống</h2>
                    <button onClick={() => navigate('/')}>Tiếp tục mua sắm</button>
                </div>
            ) : (
                <>
                    {Object.keys(cartItems).map((key) => {
                        const item = cartItems[key];
                        const product = all_product.find((p) => p.id === item.id);

                        if (product) {
                            return (
                                <div key={key}>
                                    <div className="cartitems-format cartitems-format-main">
                                        <img src={product.image} alt="" className='carticon-product-icon' />
                                        <p>{product.name}</p>
                                        <p>{item.size}</p>
                                        <p>{product.new_price}K</p>
                                        <div className="cartitems-quantity-controls">
                                            <button onClick={() => removeFromCart(item.id, item.size)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => removeFromCart(item.id, item.size, -1)}>+</button>
                                        </div>
                                        <p>{product.new_price * item.quantity}K</p>
                                        <img 
                                            className='cartitems-remove-icon' 
                                            src={remove_icon} 
                                            onClick={() => removeItemFromCart(item.id, item.size)} 
                                            alt="" 
                                        />
                                    </div>
                                    <hr />
                                </div>
                            );
                        }
                        return null;
                    })}
                    
                    <div className="cartitems-down">
                        <div className="cartitems-promo">
                            <input 
                                type="text" 
                                placeholder="Mã giảm giá" 
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button onClick={handlePromoCode}>Áp dụng</button>
                        </div>
                        <div className="cartitems-total">
                            <h3>Thông tin đơn hàng</h3>
                            <div>
                                <div className="cartitems-total-item">
                                    <p>Tạm tính</p>
                                    <p>{getTotalCartAmount()}K</p>
                                </div>
                                {discount > 0 && (
                                    <div className="cartitems-total-item">
                                        <p>Giảm giá</p>
                                        <p>-{discount}K</p>
                                    </div>
                                )}
                                <div className="cartitems-total-item">
                                    <p>Phí vận chuyển</p>
                                    <p>Miễn phí</p>
                                </div>
                                <hr />
                                <div className="cartitems-total-item">
                                    <h3>Tổng tiền</h3>
                                    <h3>{getTotalCartAmount() - discount}K</h3>
                                </div>
                            </div>
                            <button onClick={handleCheckout}>THANH TOÁN</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartItems