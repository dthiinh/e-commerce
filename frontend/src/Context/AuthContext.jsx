import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(() => {
        // Lấy thông tin người dùng từ localStorage khi khởi tạo
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [authToken, setAuthToken] = useState(() => {
        return localStorage.getItem('authToken') || null;
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Lưu thông tin người dùng vào localStorage khi có thay đổi
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);
    
    // Lưu token vào localStorage
    useEffect(() => {
        if (authToken) {
            localStorage.setItem('authToken', authToken);
        } else {
            localStorage.removeItem('authToken');
        }
    }, [authToken]);
    
    // Hàm đăng nhập
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost/backend'}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Đăng nhập thất bại');
            }
            
            setCurrentUser(data.user);
            setAuthToken(data.token);
            setIsLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    };
    
    // Hàm đăng ký
    const register = async (userData) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost/backend'}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Đăng ký thất bại');
            }
            
            setIsLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    };
    
    // Hàm đăng xuất
    const logout = () => {
        setCurrentUser(null);
        setAuthToken(null);
    };
    
    // Hàm kiểm tra đã đăng nhập chưa
    const isAuthenticated = () => {
        return !!currentUser && !!authToken;
    };
    
    const contextValue = {
        currentUser,
        authToken,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated
    };
    
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider; 