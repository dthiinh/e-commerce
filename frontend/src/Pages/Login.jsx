import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Login.css';

const Login = ({ isEmbedded = false, onSwitchTab }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    
    if (!formData.email) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Đăng nhập với:', formData);
      
      // Giả lập đăng nhập thành công
      alert('Đăng nhập thành công!');
      navigate('/');
    }
  };

  // Nếu được nhúng vào LoginSignup, chỉ render phần form
  if (isEmbedded) {
    return (
      <div className="embedded-login">
        <form onSubmit={handleSubmit}>
          <div className="login-field">
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
          
          <div className="login-field">
            <label htmlFor="password">Mật khẩu</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Nhập mật khẩu" 
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>
          
          <div className="login-options">
            <div className="remember-me">
              <input 
                type="checkbox" 
                id="rememberMe" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Nhớ mật khẩu</label>
            </div>
            <a href="#" className="forgot-password" onClick={(e) => {
              e.preventDefault();
              if (isEmbedded && onSwitchTab) {
                onSwitchTab();
              } else {
                navigate('/signup');
              }
            }}>Quên mật khẩu?</a>
          </div>
          
          <button type="submit" className="login-button">Đăng nhập</button>
        </form>
        
        {onSwitchTab && (
          <div className="login-footer">
            <p>Chưa có tài khoản? <a onClick={onSwitchTab} className="switch-tab-link">Đăng ký ngay</a></p>
          </div>
        )}
      </div>
    );
  }

  // Nếu được render như một trang độc lập
  return (
    <div className="login">
      <div className="login-container">
        <h1>Đăng nhập</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="login-field">
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
          
          <div className="login-field">
            <label htmlFor="password">Mật khẩu</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Nhập mật khẩu" 
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <span className="error-message">{formErrors.password}</span>}
          </div>
          
          <div className="login-options">
            <div className="remember-me">
              <input 
                type="checkbox" 
                id="rememberMe" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Nhớ mật khẩu</label>
            </div>
            <a href="#" className="forgot-password" onClick={(e) => {
              e.preventDefault();
              if (isEmbedded && onSwitchTab) {
                onSwitchTab();
              } else {
                navigate('/signup');
              }
            }}>Quên mật khẩu?</a>
          </div>
          
          <button type="submit" className="login-button">Đăng nhập</button>
        </form>
        
        <div className="login-footer">
          <p>Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login; 