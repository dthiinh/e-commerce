import React, { createContext, useState, useEffect, useContext } from "react";
import all_product from "../Components/Assests/all_product";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    return cart;
}

const ShopContextProvider = (props) => {
    const [menu, setMenu] = useState('shop');
    const [cartItems, setCartItems] = useState(() => {
        // Lấy dữ liệu từ localStorage nếu có
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    });
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    
    // Auth context để kiểm tra đăng nhập
    const { isAuthenticated } = useContext(AuthContext);
    
    // Lưu giỏ hàng vào localStorage mỗi khi có thay đổi
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    
    // Thêm sản phẩm với size vào giỏ hàng
    const addToCart = (itemID, selectedSize) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            const cartItemKey = `${itemID}_${selectedSize}`;
            
            // Nếu sản phẩm với size này đã tồn tại, tăng số lượng
            if (updatedCart[cartItemKey]) {
                updatedCart[cartItemKey].quantity += 1;
            } else {
                // Nếu chưa tồn tại, thêm mới
                updatedCart[cartItemKey] = {
                    id: itemID,
                    size: selectedSize,
                    quantity: 1
                };
            }
            
            return updatedCart;
        });
    }

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (itemID, selectedSize, action = 1) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            const cartItemKey = `${itemID}_${selectedSize}`;
            
            if (updatedCart[cartItemKey]) {
                if (action === 1) {
                    // Giảm số lượng
                    if (updatedCart[cartItemKey].quantity > 1) {
                        updatedCart[cartItemKey].quantity -= 1;
                    } else {
                        delete updatedCart[cartItemKey];
                    }
                } else {
                    // Tăng số lượng
                    updatedCart[cartItemKey].quantity += 1;
                }
            }
            
            return updatedCart;
        });
    }
    
    // Xóa toàn bộ sản phẩm khỏi giỏ hàng
    const removeItemFromCart = (itemID, selectedSize) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            const cartItemKey = `${itemID}_${selectedSize}`;
            
            if (updatedCart[cartItemKey]) {
                delete updatedCart[cartItemKey];
            }
            
            return updatedCart;
        });
    }
    
    // Reset giỏ hàng
    const resetCart = () => {
        setCartItems(getDefaultCart());
    }
    
    // Tính tổng tiền giỏ hàng
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        
        for (const key in cartItems) {
            const item = cartItems[key];
            const product = all_product.find((p) => p.id === item.id);
            
            if (product) {
                totalAmount += product.new_price * item.quantity;
            }
        }
        
        return totalAmount;
    }

    // Đếm tổng số sản phẩm trong giỏ hàng
    const getTotalCartItems = () => {
        let totalItems = 0;
        
        for (const itemKey in cartItems) {
            const item = cartItems[itemKey];
            if (item && item.quantity > 0) {
                totalItems += item.quantity;
            }
        }
        
        return totalItems;
    }
    
    // Kiểm tra đăng nhập trước khi thanh toán
    const proceedToCheckout = (navigate) => {
        if (!isAuthenticated()) {
            setShowLoginPrompt(true);
            return false;
        }
        
        navigate('/checkout');
        return true;
    }
    
    // Đóng thông báo đăng nhập
    const closeLoginPrompt = () => {
        setShowLoginPrompt(false);
    }
    
    // Chuyển hướng đến trang đăng nhập
    const goToLogin = (navigate) => {
        setShowLoginPrompt(false);
        navigate('/login');
    }

    const contextValue = {
        all_product,
        cartItems,
        menu,
        setMenu,
        showLoginPrompt,
        addToCart,
        removeFromCart,
        removeItemFromCart,
        resetCart,
        getTotalCartAmount,
        getTotalCartItems,
        proceedToCheckout,
        closeLoginPrompt,
        goToLogin
    };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
