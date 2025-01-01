// context/CartContext.js
'use client';

import { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add an item to the cart
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };    

    // Remove an item from the cart (optional)
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Update an item's quantity in the cart (optional)
    const updateQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
