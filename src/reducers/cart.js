import { combineReducers } from 'redux'
import { ADD_TO_CART, REMOVE_FROM_CART, CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE, PROMO_CODE } from '../actions'

const initialState = {
  checkoutStatus: {
    checkoutPending: false,
    error: null, 
  },
    promoStatus:{
    promoApplied:false,
    inputPromo:"",
    discountTotal:0,
    },
   
  quantityById: {},
}


function checkoutStatus(state = initialState.checkoutStatus, action) {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return {
        checkoutPending: true,
        error: null,
      }
    case CHECKOUT_SUCCESS:
      return initialState.checkoutStatus
    case CHECKOUT_FAILURE:
      return {
        checkoutPending: false,
        error: action.error,
      }
    default:
      return state
  }
}

function quantityById(state = initialState.quantityById, action) {
  const { productId } = action
  switch (action.type) {
    case CHECKOUT_SUCCESS:
      return initialState.quantityById
    case ADD_TO_CART:
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1,
          
      }
    case REMOVE_FROM_CART:
      const qty = (state[productId] || 0) - 1
      const copy = { ...state }
      if (qty > 0) copy[productId] = qty
      else delete copy[productId]
      return copy
    default:
      return state
  }
}

function promoCodeHandler(state = initialState.promoStatus,action,total){
    switch(action.type){
        case PROMO_CODE:
            
            
            state.inputPromo = document.getElementById("promo_code").value
            
            var total = document.getElementById("promo_code").name
            
            
            if(state.promoApplied === false){
                 
                console.log((state.inputPromo).toUpperCase())
                if((state.inputPromo).toUpperCase().localeCompare("RRD4D32")===0  && total >=5000){
                   // get 10% percent off
                    state.discountTotal = total - (total/10);
                    console.log(state.discountTotal)
                    return {
                    ...state,
                    promoApplied:true,
                    
                    
                    }   
                }
                else if((state.inputPromo).toUpperCase().localeCompare("44F4T11") ===0 && total>=10000){
                    //get 15% percent off 
                    state.discountTotal = total - (total/15);
                    console.log(state.discountTotal)
                   return {
                    ...state,
                    promoApplied:true,
                    
                    
                    }
                }
                else{
                    return {
                    ...state,
                    promoApplied:false,
                    
                    
                    }
                }
            }
            else{
                return {
                    ...state,
                    promoApplied:false,
                    
                    
                    }
                
            }
        default:
            return initialState.promoStatus
    }
}

export default combineReducers({
  checkoutStatus,
   promoCodeHandler,
  quantityById,
})

export function getQuantity(state, productId) {
  return state.quantityById[productId] || 0
}

export function getAddedIds(state) {
  return Object.keys(state.quantityById)
}
