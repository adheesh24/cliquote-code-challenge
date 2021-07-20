import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext()

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false, promo: false, discountTotal:0,inputPromo:"" };

const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(CartReducer, initialState)

    const increase = payload => {
        dispatch({type: 'INCREASE', payload})
    }

    const decrease = payload => {
        dispatch({type: 'DECREASE', payload})
    }

    const addProduct = payload => {
        dispatch({type: 'ADD_ITEM', payload})
    }

    const removeProduct = payload => {
        dispatch({type: 'REMOVE_ITEM', payload})
    }

    const clearCart = () => {
        dispatch({type: 'CLEAR'})
    }
    const handlePromoCode = () => {
        console.log('PROMO', state);
        dispatch({type: 'PROMO_CODE'})
    }

    const handleCheckout = () => {
        console.log('CHECKOUT', state);
        dispatch({type: 'CHECKOUT'})
    }
   
   

    const contextValues = {
        removeProduct,
        addProduct,
        increase,
        decrease,
        clearCart,
        handlePromoCode,
        handleCheckout,
        ...state
    } 

    return ( 
        <CartContext.Provider value={contextValues} >
            { children }
        </CartContext.Provider>
     );
}
 
export default CartContextProvider;
