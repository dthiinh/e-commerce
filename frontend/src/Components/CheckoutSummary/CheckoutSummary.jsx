import React, { useContext } from 'react';
import './CheckoutSummary.css';
import { ShopContext } from '../../Context/ShopContext';

const CheckoutSummary = () => {
    const { getTotalCartAmount, all_product, cartItems, discount = 0 } = useContext(ShopContext);

    return (
        <div className="checkout-summary">
            <h2>Tóm tắt đơn hàng</h2>
            
            <div className="summary-items">
                {Object.keys(cartItems).map((key) => {
                    const item = cartItems[key];
                    const product = all_product.find((p) => p.id === item.id);
                    
                    if (product) {
                        return (
                            <div className="summary-item" key={key}>
                                <div className="summary-item-img">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="summary-item-details">
                                    <h4>{product.name}</h4>
                                    <div className="summary-item-info">
                                        <p>Size: {item.size}</p>
                                        <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <p className="summary-item-price">{product.new_price * item.quantity}K</p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            
            <div className="summary-totals">
                <div className="summary-total-item">
                    <p>Tạm tính</p>
                    <p>{getTotalCartAmount()}K</p>
                </div>
                
                {discount > 0 && (
                    <div className="summary-total-item discount">
                        <p>Giảm giá</p>
                        <p>-{discount.toFixed(2)}K</p>
                    </div>
                )}
                
                <div className="summary-total-item">
                    <p>Phí vận chuyển</p>
                    <p>Miễn phí</p>
                </div>
                
                <div className="summary-total-item final">
                    <h3>Tổng cộng</h3>
                    <h3>{(getTotalCartAmount() - discount).toFixed(3)}K</h3>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSummary; 