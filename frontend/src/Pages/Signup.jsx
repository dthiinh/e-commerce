import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Signup.css';

const Signup = ({ isEmbedded = false, onSwitchTab }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Xóa lỗi khi người dùng bắt đầu nhập lại
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.email) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (!formData.agree) {
      errors.agree = 'Bạn phải đồng ý với điều khoản sử dụng';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Đăng ký với:', formData);
      
      // Giả lập đăng ký thành công
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      
      if (isEmbedded && onSwitchTab) {
        onSwitchTab();
      } else {
        navigate('/login');
      }
    }
  };

  // Nếu được nhúng vào LoginSignup, chỉ render phần form
  if (isEmbedded) {
    return (
      <div className="embedded-signup">
        <form onSubmit={handleSubmit}>
          <div className="signup-field">
            <label htmlFor="fullName">Họ và tên</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              placeholder="Nhập họ tên của bạn" 
              value={formData.fullName}
              onChange={handleChange}
              className={formErrors.fullName ? 'error' : ''}
            />
            {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
          </div>
          
          <div className="signup-field">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              placeholder="Nhập email của bạn" 
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          
          <div className="signup-field">
            <label htmlFor="password">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Tạo mật khẩu" 
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>
          
          <div className="signup-field">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Xác nhận mật khẩu" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className={formErrors.confirmPassword ? 'error' : ''}
            />
            {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
          </div>
          
          <div className="signup-agree">
            <input 
              type="checkbox" 
              id="agree" 
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className={formErrors.agree ? 'error' : ''}
            />
            <label htmlFor="agree">Tôi đồng ý với các điều khoản sử dụng và chính sách bảo mật</label>
          </div>
          {formErrors.agree && <span className="error-message agree-error">{formErrors.agree}</span>}
          
          <button type="submit" className="signup-button">Đăng ký</button>
        </form>
        
        {onSwitchTab && (
          <div className="signup-footer">
            <p>Đã có tài khoản? <a onClick={onSwitchTab} className="switch-tab-link">Đăng nhập</a></p>
          </div>
        )}
      </div>
    );
  }

  // Nếu được render như một trang độc lập
  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Đăng ký</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="signup-field">
            <label htmlFor="fullName">Họ và tên</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              placeholder="Nhập họ tên của bạn" 
              value={formData.fullName}
              onChange={handleChange}
              className={formErrors.fullName ? 'error' : ''}
            />
            {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
          </div>
          
          <div className="signup-field">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              placeholder="Nhập email của bạn" 
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          
          <div className="signup-field">
            <label htmlFor="password">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Tạo mật khẩu" 
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>
          
          <div className="signup-field">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Xác nhận mật khẩu" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className={formErrors.confirmPassword ? 'error' : ''}
            />
            {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
          </div>
          
          <div className="signup-agree">
            <input 
              type="checkbox" 
              id="agree" 
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className={formErrors.agree ? 'error' : ''}
            />
            <label htmlFor="agree">Tôi đồng ý với các điều khoản sử dụng và chính sách bảo mật</label>
          </div>
          {formErrors.agree && <span className="error-message agree-error">{formErrors.agree}</span>}
          
          <button type="submit" className="signup-button">Đăng ký</button>
        </form>
        
        <div className="signup-footer">
          <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 