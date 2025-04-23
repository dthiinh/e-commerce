import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPrompt.css';
import { ShopContext } from '../../Context/ShopContext';

const LoginPrompt = () => {
    const { closeLoginPrompt, goToLogin } = useContext(ShopContext);
    const navigate = useNavigate();
    
    return (
        <div className="login-prompt-overlay">
            <div className="login-prompt">
                <div className="login-prompt-header">
                    <h3>Vui lòng đăng nhập</h3>
                    <button className="close-button" onClick={closeLoginPrompt}>&times;</button>
                </div>
                <div className="login-prompt-content">
                    <p>Bạn cần đăng nhập để tiếp tục thanh toán.</p>
                    <div className="login-prompt-buttons">
                        <button className="cancel-button" onClick={closeLoginPrompt}>Hủy</button>
                        <button className="login-button" onClick={() => goToLogin(navigate)}>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPrompt; 