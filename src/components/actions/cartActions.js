import { ADD_TO_CART,REMOVE_ITEM,REMOVE_FROM_CART,ADD_QUANTITY} from './action-types/cart-actions'

//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
////remove item action
//export const removeItem=(id)=>{
//    return{
//        type: REMOVE_ITEM,
//        id
//    }
//}
//subtract qt action
export const removeFromCart=(id)=>{
    return{
        type: REMOVE_FROM_CART,
        id
    }
}
//add qt action
//export const addQuantity=(id)=>{
//    return{
//        type: ADD_QUANTITY,
//        id
//    }
//}