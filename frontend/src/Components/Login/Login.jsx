import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ switchTab }) => {
  const navigate = useNavigate();
  
  // State cho form đăng nhập
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // State cho lỗi form
  const [formErrors, setFormErrors] = useState({});

  // Xử lý thay đổi trong form đăng nhập
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
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

  // Xác thực form đăng nhập
  const validateLoginForm = () => {
    const errors = {};
    
    if (!loginData.email) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!loginData.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
      console.log('Đăng nhập với:', loginData);
      
      // Giả lập đăng nhập thành công
      alert('Đăng nhập thành công!');
      navigate('/');
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <div className="form-field">
          <label htmlFor="login-email">Email</label>
          <input 
            type="email"
            id="login-email" 
            name="email" 
            placeholder="Nhập email của bạn" 
            value={loginData.email}
            onChange={handleLoginChange}
            className={formErrors.email ? 'error' : ''}
          />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>
        
        <div className="form-field">
          <label htmlFor="login-password">Mật khẩu</label>
          <input 
            type="password" 
            id="login-password"
            name="password" 
            placeholder="Nhập mật khẩu" 
            value={loginData.password}
            onChange={handleLoginChange}
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
              checked={loginData.rememberMe}
              onChange={handleLoginChange}
            />
            <label htmlFor="rememberMe">Nhớ mật khẩu</label>
          </div>
        </div>
        
        <button type="submit" className="form-button">Đăng nhập</button>
      </form>
      
      <div className="form-footer">
        <p>Chưa có tài khoản? <a onClick={() => switchTab('signup')} className="switch-tab-link">Đăng ký ngay</a></p>
      </div>
    </div>
  );
};

export default Login; 