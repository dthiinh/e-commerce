import React, { useState } from 'react'
import './CheckoutForm.css'

const CheckoutForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'cod'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="checkout-form">
            <h2>Thông tin thanh toán</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="address">Địa chỉ</label>
                    <input 
                        type="text" 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange}
                        required 
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city">Thành phố</label>
                        <input 
                            type="text" 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zipCode">Mã bưu điện</label>
                        <input 
                            type="text" 
                            id="zipCode" 
                            name="zipCode" 
                            value={formData.zipCode} 
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group payment-methods">
                    <label>Phương thức thanh toán</label>
                    <div className="payment-options">
                        <div className="payment-option">
                            <input 
                                type="radio" 
                                id="cod" 
                                name="paymentMethod" 
                                value="cod"
                                checked={formData.paymentMethod === 'cod'}
                                onChange={handleChange}
                            />
                            <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
                        </div>
                        <div className="payment-option">
                            <input 
                                type="radio" 
                                id="bank" 
                                name="paymentMethod" 
                                value="bank" 
                                checked={formData.paymentMethod === 'bank'}
                                onChange={handleChange}
                            />
                            <label htmlFor="bank">Chuyển khoản ngân hàng</label>
                        </div>
                    </div>
                </div>
                
                <button type="submit" className="checkout-button">Hoàn tất đặt hàng</button>
            </form>
        </div>
    )
}

export default CheckoutForm 