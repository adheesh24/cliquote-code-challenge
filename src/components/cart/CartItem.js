import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from '../store/Product'
import {  PlusCircleIcon,MinusCircleIcon } from '../../utils/icons'

export default class CartItem extends Component {
  render() {
    const { price, quantity, title, onRemove, onAdd } = this.props

    return (
        
        
        <Product price={price} quantity={quantity} title={title} action1={<button onClick={onAdd}><PlusCircleIcon width={"20px"}/></button>} 
        action2={<button onClick={onRemove}><MinusCircleIcon width={"20px"}/></button>} />
        
      
    )
  }
}

CartItem.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
 
}




