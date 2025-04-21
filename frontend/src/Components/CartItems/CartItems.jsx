import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assests/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, removeItemFromCart, resetCart } = useContext(ShopContext);
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

    const goToCheckout = () => {
        navigate('/checkout');
    }

    return (
        <div className='cartitems'>
            <div className="cartitems-header">
                <div className="cartitems-format-main">
                    <p>Sản phẩm</p>
                    <p>Tên sản phẩm</p>
                    <p>Size</p>
                    <p>Giá</p>
                    <p>Số lượng</p>
                    <p>Tổng</p>
                    <p>Xóa</p>
                </div>
            </div>
            <hr />
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
                                <p>${product.new_price}</p>
                                <div className="cartitems-quantity-controls">
                                    <button onClick={() => removeFromCart(item.id, item.size)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => removeFromCart(item.id, item.size, -1)}>+</button>
                                </div>
                                <p>${product.new_price * item.quantity}</p>
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
            
            {Object.keys(cartItems).length === 0 && (
                <div className="empty-cart">
                    <h2>Giỏ hàng trống</h2>
                    <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                </div>
            )}
            
            {Object.keys(cartItems).length > 0 && (
                <>
                    <div className="clear-cart-container">
                        <button className="clear-cart-button" onClick={resetCart}>Xóa tất cả giỏ hàng</button>
                    </div>
                    
                    <div className="cartitems-down">
                        <div className="cartitems-total">
                            <h1>Tổng giỏ hàng</h1>
                            <div>
                                <div className="cartitems-total-item">
                                    <p>Tạm tính</p>
                                    <p>${getTotalCartAmount()}</p>
                                </div>
                                <hr />
                                {discount > 0 && (
                                    <>
                                        <div className="cartitems-total-item">
                                            <p>Giảm giá</p>
                                            <p>-${discount.toFixed(2)}</p>
                                        </div>
                                        <hr />
                                    </>
                                )}
                                <div className="cartitems-total-item">
                                    <p>Phí vận chuyển</p>
                                    <p>Miễn phí</p>
                                </div>
                                <hr />
                                <div className="cartitems-total-item">
                                    <h3>Tổng cộng</h3>
                                    <h3>${(getTotalCartAmount() - discount).toFixed(2)}</h3>
                                </div>
                            </div>
                            <button onClick={goToCheckout}>THANH TOÁN</button>
                        </div>
                        <div className="cartitems-promocode">
                            <p>Nếu bạn có mã giảm giá, nhập tại đây</p>
                            <div className="cartitems-promobox">
                                <input 
                                    type="text" 
                                    placeholder='Mã giảm giá' 
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button onClick={handlePromoCode}>Áp dụng</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartItems