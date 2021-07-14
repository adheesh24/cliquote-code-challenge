import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, removeFromCart } from './actions/cartActions'
import styles from './module.css';
import Button from './CustomButtonComponent'

class Home extends Component{
    
    
     // add item to cart
    handleAddToCart= (id)=>{
        this.props.addToCart(id);
    }
   
    //to remove from cart
    handleRemoveFromCart = (id)=>{
        this.props.removeFromCart(id);
    }
    

    render(){

       let itemList = this.props.items.map(item=>{
            return(
                <div className="img" key={item.id}>
                        <div className="card-image">
                            <img src={item.img} alt={item.title}/>
                            <span className="card-title">{item.title}</span>
                      
                        </div>
                

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <p><b>Price:  $ {item.price}</b></p>
                        </div>
                                           
                        <div className={styles.row}>
                                            
                                <button className={styles.button}
                                        aria-label="Decrement value"
                                        onClick={()=>{this.handleRemoveFromCart(item.id)}}>
                                        -
                                </button>
                                
                                <span className={styles.value}>{item.quantity}</span>
                                     
                                <button className={styles.button} 
                                    aria-label="Increment value"
                                    onClick={()=>{this.handleAddToCart(item.id)}}>
                                    +
                                </button>

                        </div>
                        
                        
                 </div>
                 
                 
                  
            )
        })
        return(
            <div className="container">
                <h3 className="center">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
                
                <span className={styles.value}>Total: {this.props.total} $</span>
            </div>
        )
    }
        
}   






//Takes the state in cartReducer and pass it as props 
const mapStateToProps = (state)=>{
    return {
        items: state.items,
        total: state.total
     }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        removeFromCart: (id)=>{dispatch(removeFromCart(id))}
     }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)