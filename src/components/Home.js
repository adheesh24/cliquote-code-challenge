import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import styles from './module.css';

class Home extends Component{
    
    handleClick = (id)=>{
        this.props.addToCart(id);
    }

    render(){

       let itemList = this.props.items.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src={item.img} alt={item.title}/>
                            <span className="card-title">{item.title}</span>
                            
                
                            <button
                             className= {styles.button}
                             onClick={()=>{this.handleClick(item.id)}}> Add 
                            </button>
                                          
                
                        </div>

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <p><b>Price:  $ {item.price}</b></p>
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
            </div>
        )
    }
        
}   






//Takes the state in cartReducer and pass it as props 
const mapStateToProps = (state)=>{
    return {
        items: state.items
     }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
     }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)