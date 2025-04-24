import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assests/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    return cart;
}

const ShopContextProvider = (props) => {
    const [menu, setMenu] = useState('shop');
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    });
    
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    
    const addToCart = (itemID, selectedSize) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            const cartItemKey = `${itemID}_${selectedSize}`;
            
            if (updatedCart[cartItemKey]) {
                updatedCart[cartItemKey].quantity += 1;
            } else {
                updatedCart[cartItemKey] = {
                    id: itemID,
                    size: selectedSize,
                    quantity: 1
                };
            }
            
            return updatedCart;
        });
    }

    const removeFromCart = (itemID, selectedSize, action = 1) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            const cartItemKey = `${itemID}_${selectedSize}`;
            
            if (updatedCart[cartItemKey]) {
                if (action === 1) {
                    if (updatedCart[cartItemKey].quantity > 1) {
                        updatedCart[cartItemKey].quantity -= 1;
                    } else {
                        delete updatedCart[cartItemKey];
                    }
                } else {
                    updatedCart[cartItemKey].quantity += 1;
                }
            }
            
            return updatedCart;
        });
    }
    
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
    
    const resetCart = () => {
        setCartItems(getDefaultCart());
    }
    
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

    const contextValue = {
        all_product,
        cartItems,
        menu,
        setMenu,
        addToCart,
        removeFromCart,
        removeItemFromCart,
        resetCart,
        getTotalCartAmount,
        getTotalCartItems
    };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
