import React, { Component } from 'react'
import ProductList from './store/ProductList'
import Cart from './cart/Cart'

export default class App extends Component {
  render() {
    return (
      <div>
        
        <ProductList />
      
        <Cart />
      </div>
    )
  }
}
