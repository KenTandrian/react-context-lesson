import React, { createContext, useState, useEffect } from 'react';

import { 
    addItemToCart, 
    removeItemFromCart, 
    filterItemFromCart,
    getCartItemsCount, 
    getCartItemsTotal
} from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemsCount: 0,
    cartItemsTotal: 0
});

const CartProvider = ({ children }) => {
    const [ hidden, setHidden ] = useState(true);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartItemsCount, setCartItemsCount ] = useState(0);
    const [ cartItemsTotal, setCartItemsTotal ] = useState(0);

    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const toggleHidden = () => setHidden(!hidden);
    const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems, item));

    useEffect(() => {
        setCartItemsCount(getCartItemsCount(cartItems));
        setCartItemsTotal(getCartItemsTotal(cartItems));
    }, [cartItems])

    return (
        <CartContext.Provider
            value={{
                hidden,
                toggleHidden,
                cartItems,
                addItem,
                removeItem,
                clearItemFromCart,
                cartItemsCount,
                cartItemsTotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;