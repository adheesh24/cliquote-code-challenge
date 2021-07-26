import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {formatNumber} from '../../utils/utils'

export default class Product extends Component {
  render() {
    const { price, quantity, title, action1, action2 } = this.props
    return (
     
        
        <div >
        {title} - &#36;{formatNumber(price)} {quantity ? `x ${quantity}` : null} {action1}{action2}
      </div>
    )
  }
}

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  action1: PropTypes.node,
    action2:PropTypes.node,
}
