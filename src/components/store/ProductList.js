import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'
import Layout from '../../utils/Layout'
import { connect } from 'react-redux'
import { addToCart } from '../../actions'
import { getVisibleProducts } from '../../reducers/products'

class ProductList extends Component {
  render() {
    const { products, addToCart } = this.props

    return (
        <Layout title="Cart" description="This is the Products page" >
        
        <div className="text-center mt-5">
                    <h1>Products</h1>
                    
                </div>
      
        <div className="row no-gutters justify-content-center">
                   
        
        {products.map(product => (
          <ProductItem key={product.id} product={product} onAddToCartClicked={() => addToCart(product.id)} />
        ))}
      </div>
</Layout>


    )
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
}

export default connect(state => ({ products: getVisibleProducts(state.products) }), { addToCart })(ProductList)
