import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  
  // Tự động chuyển tab dựa trên đường dẫn
  useEffect(() => {
    if (location.pathname === '/signup') {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname]);
  
  // State cho form đăng nhập
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // State cho form đăng ký
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
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

  // Xử lý thay đổi trong form đăng ký
  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({
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

  // Xác thực form đăng ký
  const validateSignupForm = () => {
    const errors = {};
    
    if (!signupData.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!signupData.email) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!signupData.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
    } else if (signupData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (!signupData.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (signupData.confirmPassword !== signupData.password) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (!signupData.agree) {
      errors.agree = 'Bạn phải đồng ý với điều khoản sử dụng';
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

  // Xử lý đăng ký
  const handleSignup = (e) => {
    e.preventDefault();
    
    if (validateSignupForm()) {
      console.log('Đăng ký với:', signupData);
      
      // Giả lập đăng ký thành công
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      setActiveTab('login');
      navigate('/login');
    }
  };

  // Chuyển tab và cập nhật URL
  const switchTab = (tab) => {
    setActiveTab(tab);
    navigate(tab === 'login' ? '/login' : '/signup');
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`} 
            onClick={() => switchTab('login')}
          >
            Đăng nhập
          </div>
          <div 
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`} 
            onClick={() => switchTab('signup')}
          >
            Đăng ký
          </div>
        </div>

        {activeTab === 'login' ? (
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
                <a href="#" className="forgot-password" onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('signup');
                  navigate('/signup');
                }}>Quên mật khẩu?</a>
              </div>
              
              <button type="submit" className="form-button">Đăng nhập</button>
            </form>
            
            <div className="form-footer">
              <p>Chưa có tài khoản? <a onClick={() => switchTab('signup')} className="switch-tab-link">Đăng ký ngay</a></p>
            </div>
          </div>
        ) : (
          <div className="signup-form">
            <form onSubmit={handleSignup}>
              <div className="form-field">
                <label htmlFor="fullName">Họ và tên</label>
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Nhập họ tên của bạn" 
                  value={signupData.fullName}
                  onChange={handleSignupChange}
                  className={formErrors.fullName ? 'error' : ''}
                />
                {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
              </div>
              
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Nhập email của bạn" 
                  value={signupData.email}
                  onChange={handleSignupChange}
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
              
              <div className="form-field">
                <label htmlFor="password">Mật khẩu</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Tạo mật khẩu" 
                  value={signupData.password}
                  onChange={handleSignupChange}
                  className={formErrors.password ? 'error' : ''}
                />
                {formErrors.password && <span className="error-message">{formErrors.password}</span>}
              </div>
              
              <div className="form-field">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  placeholder="Xác nhận mật khẩu" 
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  className={formErrors.confirmPassword ? 'error' : ''}
                />
                {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
              </div>
              
              <div className="agree-checkbox">
                <input 
                  type="checkbox" 
                  id="agree" 
                  name="agree"
                  checked={signupData.agree}
                  onChange={handleSignupChange}
                  className={formErrors.agree ? 'error' : ''}
                />
                <label htmlFor="agree">Tôi đồng ý với các điều khoản sử dụng và chính sách bảo mật</label>
              </div>
              {formErrors.agree && <span className="error-message agree-error">{formErrors.agree}</span>}
              
              <button type="submit" className="form-button">Đăng ký</button>
            </form>
            
            <div className="form-footer">
              <p>Đã có tài khoản? <a onClick={() => switchTab('login')} className="switch-tab-link">Đăng nhập</a></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;