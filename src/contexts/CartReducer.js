
const Storage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems: []));
}

export const sumItems = cartItems => {
    Storage(cartItems);
    let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
    let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    return { itemCount, total }
}

export const CartReducer = (state, action) => {
    

    switch (action.type) {
        case "ADD_ITEM":
            if (!state.cartItems.find(item => item.id === action.payload.id)) {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1
                })
            } 

            return {
                ...state,
                ...sumItems(state.cartItems),
                checkout: false,
                promo:false,
                cartItems: [...state.cartItems]
            }
        case "REMOVE_ITEM":
            return {
                ...state,
                ...sumItems(state.cartItems.filter(item => item.id !== action.payload.id)),
                promo:false,
                cartItems: [...state.cartItems.filter(item => item.id !== action.payload.id)]
            }
        case "INCREASE":
            state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity++
            return {
                ...state,
                ...sumItems(state.cartItems),
                promo:false,
                cartItems: [...state.cartItems]
            }
        case "DECREASE":
            state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity--
            return {
                ...state,
                ...sumItems(state.cartItems),
                promo:false,
                cartItems: [...state.cartItems]
            }
        case "PROMO_CODE":
            //var promoCode
             state.inputPromo = document.getElementById("promo_code").value
            console.log(state.total)
            console.log(state.promo)
            console.log(state.inputPromo)
            if(state.promo === false){
                 
                console.log((state.inputPromo).toUpperCase())
                if((state.inputPromo).toUpperCase().localeCompare("RRD4D32")===0  && state.total >=5000){
                   // get 10% percent off
                    state.discountTotal = state.total - (state.total/10);
                    console.log(state.discountTotal)
                    return {
                    ...state,
                    promo:true,
                    cartItems: [...state.cartItems]
                    }   
                }
                else if((state.inputPromo).toUpperCase().localeCompare("44F4T11") ===0 && state.total>=10000){
                    //get 15% percent off 
                    state.discountTotal = state.total - (state.total/15);
                    console.log(state.discountTotal)
                   return {
                    ...state,
                    promo:true,
                    cartItems: [...state.cartItems]
                    }
                }
                else{
                    return {
                    ...state,
                    promo:false,
                    cartItems: [...state.cartItems]
                    }
                }
            }
            else{
                return {
                    ...state,
                    promo:false,
                    cartItems: [...state.cartItems]
                    }
                
            }
            
            
    
        case "CHECKOUT":
            return {
                cartItems: [],
                checkout: true,
                promo:false,
                ...sumItems([]),
            }
        case "CLEAR":
                return {
                    cartItems: [],
                    ...sumItems([]),
                }
        default:
            return state

    }
}