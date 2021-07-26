import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import {formatNumber} from '../../utils/utils'

export default class ProductItem extends Component {
  render() {
    const { product } = this.props
    

    return (
      
        
         <div className="card card-body">
            <img style={{display: "block", margin: "0 auto 10px", maxHeight: "200px"}} className="img-fluid" 
            src={product.photo + '?v=' + product.id} alt=""/>
            <p>{product.title}</p>
            <h3 className="text-left">{formatNumber(product.price)}</h3>
            <div className="text-right">
               
            <button onClick={this.props.onAddToCartClicked} className="btn btn-outline-primary btn-sm"> Add to cart 
            </button>
          
            </div>
        </div>
        
          
    )
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired,
}





