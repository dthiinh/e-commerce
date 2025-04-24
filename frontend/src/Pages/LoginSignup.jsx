import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from '../Components/Login/Login';
import Signup from '../Components/Signup/Signup';

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
          <Login switchTab={switchTab} />
        ) : (
          <Signup switchTab={switchTab} />
        )}
      </div>
    </div>
  );
};

export default LoginSignup;