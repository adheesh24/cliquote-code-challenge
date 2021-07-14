import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'

import { ADD_TO_CART,REMOVE_FROM_CART} from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Managed Security Services', desc: "Descibe this service", price:2549.99,img:Item1},
        {id:2,title:'Engineering & Integration', desc: "Describe this service here", price:1025.50,img: Item2},
        {id:3,title:'Training', desc: "Training to be provided to applicants",price:100,img: Item3}
          
    ],
    addedItems:[],
    total: 0
    

}

const cartReducer= (state = initState,action)=>{
   
    
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
        
    
        
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
   
    if(action.type=== REMOVE_FROM_CART){ 
        
            
        
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            
            let itemToRemove= state.addedItems.find(item=> action.id === item.id)
            let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
            console.log(itemToRemove)
            console.log(addedItem)
            addedItem.quantity = 0
            
            return{
                ...state,
                addedItems: new_items,
                total: newTotal,
                
            }
        }
        else if(typeof addedItem.quantity != undefined ) {
            
            console.log(addedItem.quantity);
            console.log("In else condition")
            addedItem.quantity -= 1
            let newTotal
                newTotal = state.total - addedItem.price
            
            return{
                ...state,
                total: newTotal
            }
        }
        
        
    }

    
    
  else{
    return state
    }
    
}

export default cartReducer