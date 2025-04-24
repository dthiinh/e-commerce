import React, { useContext, useState } from 'react';
import './CSS/Checkout.css';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../Components/CheckoutForm/CheckoutForm';
import CheckoutSummary from '../Components/CheckoutSummary/CheckoutSummary';
import { ShopContext } from '../Context/ShopContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { setMenu, resetCart } = useContext(ShopContext);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  const handleCheckout = (formData) => {
    console.log('Thông tin đặt hàng:', formData);
    
    setOrderInfo(formData);
    setOrderComplete(true);
    
    setTimeout(() => {
      resetCart();
    }, 1000);
  };

  const handleBackToShop = () => {
    navigate('/');
    setMenu('shop');
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <h1>Thanh toán</h1>
        
        {orderComplete ? (
          <div className="order-success">
            <div className="success-icon">
              <i className="checkmark">✓</i>
            </div>
            <h2>Đặt hàng thành công!</h2>
            <p>Cảm ơn bạn đã mua sắm cùng chúng tôi.</p>
            
            {orderInfo && (
              <div className="order-details">
                <h3>Thông tin đơn hàng</h3>
                <p><strong>Họ tên:</strong> {orderInfo.fullName}</p>
                <p><strong>Email:</strong> {orderInfo.email}</p>
                <p><strong>Địa chỉ:</strong> {orderInfo.address}, {orderInfo.city}</p>
                <p><strong>Phương thức thanh toán:</strong> {
                  orderInfo.paymentMethod === 'cod' 
                    ? 'Thanh toán khi nhận hàng' 
                    : 'Chuyển khoản ngân hàng'
                }</p>
              </div>
            )}
            
            <button className="back-to-shop" onClick={handleBackToShop}>
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="checkout-content">
            <div className="checkout-form-container">
              <CheckoutForm onSubmit={handleCheckout} />
            </div>
            <div className="checkout-summary-container">
              <CheckoutSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout; 