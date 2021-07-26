import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CartItem from './CartItem'
import { connect } from 'react-redux'
import Layout from '../../utils/Layout'
import { checkout, removeFromCart,addToCart, handlePromoCode } from '../../actions'
import { getTotal, getCartProducts, getCheckoutError, isCheckoutPending, isPromoApplied, 
        getDiscountTotal} from '../../reducers'
import {formatNumber} from '../../utils/utils'

class Cart extends Component {
  render() {
    const { products, total, error, checkoutPending, checkout,addToCart, removeFromCart,promoApplied,inputPromo, discountTotal, handlePromoCode } = this.props

    const hasProducts = products.length > 0
    const checkoutAllowed = hasProducts && !checkoutPending


    return (
        
        
          <Layout title="Cart" description="This is the Cart page" >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    
                </div>
                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                    {
                            products.length > 0 ?
                            (products.map(product => (
                              <CartItem
                                title={product.title}
                                price={product.price}
                                quantity={product.quantity}
                                key={product.id}
                                onAdd={() => addToCart(product.id)}
                                onRemove={() => removeFromCart(product.id)}
                              />
                            ))
                          ) :
                        <div className="p-3 text-center text-muted">
                            Your cart is empty
                        </div>
                    }
                    
                    </div>

                    {
                        hasProducts && 
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                               
                                <p className="mb-1">Cart Total</p>
                                <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                            
                            { promoApplied &&
                                
                                <div>
                                <br />
                                <p className="mb-1">Discount: - {formatNumber(total - discountTotal)}</p>
                                <p className="mb-1">Total Payable Amount</p>
                                <h2 className="m-0 txt-right">{formatNumber(discountTotal)}</h2>
                                                               </div>
                                
                            }
                                <hr className="my-4"/>
                                    
                                
                               <form>
                                    <div className="d-flex" >
                                        <input  type="text" name={total} placeholder="ENTER PROMO CODE" className="form-control" id="promo_code"   value= {inputPromo} onChange={(e) => handlePromoCode(e.target.value)} />
                                            <button type="button" className="btn btn-outlineprimary btn-sm" onClick={handlePromoCode}>Submit</button>
                                    </div>
                                </form>
                            { promoApplied &&
                                <p className="mb-1">Promo code applied </p>
                                
                            }
                            
                                
                                    <br /><br /><br />
                                                
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2" onClick={checkout} disabled={checkoutAllowed ? '' : 'disabled'}>CHECKOUT</button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm" onClick={checkout}>CLEAR</button>
                                </div>

                            </div>
                        </div>
                    }

        
       
        
      </div>
</Layout>

    )
  }
}




            

Cart.propTypes = {
  // data
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  total: PropTypes.string,
  error: PropTypes.string,
  checkoutPending: PropTypes.bool,
  promoApplied:PropTypes.bool,
    inputPromo:PropTypes.string,
    discountTotal:PropTypes.number,
  

  // actions
  checkout: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    handlePromoCode:PropTypes.func.isRequired,
}

export default connect(
  state => ({
    products: getCartProducts(state),
    total: getTotal(state),
    error: getCheckoutError(state),
    checkoutPending: isCheckoutPending(state),
      promoApplied: isPromoApplied(state),
      discountTotal:getDiscountTotal(state)
      
  }),
  { checkout, addToCart,removeFromCart, handlePromoCode },
)(Cart)
