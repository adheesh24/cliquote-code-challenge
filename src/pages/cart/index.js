import React, { useContext, useState } from 'react';
import Layout from '../../components/Layout';

import CartProducts from './CartProducts';
import { CartContext } from '../../contexts/CartContext';
import { formatNumber } from '../../helpers/utils';
import { Link } from 'react-router-dom';


const Cart = () => {

    const [input, setInput] = useState("")
    
    const { total, discountTotal, cartItems, itemCount, clearCart,checkout,promo, handlePromoCode, handleCheckout, inputPromo } = useContext(CartContext);
    
   
   
   
    return ( 
        <Layout title="Cart" description="This is the Cart page" >
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            cartItems.length > 0 ?
                            <CartProducts/> :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                            </div>
                        }

                        { checkout && 
                            <div className="p-3 text-center text-success">
                                <p>Checkout successfull</p>
                                <Link to="/" className="btn btn-outline-success btn-sm">BUY MORE</Link>
        
                            </div>
                            
                        }
                    </div>
                    {
                        cartItems.length > 0 && 
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{itemCount}</h4>
                                <p className="mb-1">Cart Total</p>
                                <h3 className="m-0 txt-right">{formatNumber(total)}</h3>
                            
                            {promo &&
                                
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
                                        <input  type="text" name="promo_code" placeholder="ENTER PROMO CODE" className="form-control" id="promo_code" value= {inputPromo} onChange={(e) => handlePromoCode(e.target.value)} />
                                            <button type="button" className="btn btn-outlineprimary btn-sm" onClick={handlePromoCode}>Submit</button>
                                    </div>
                                </form>
                            {promo &&
                                <p className="mb-1">Promo code applied </p>
                                
                            }
                            
                                
                                    <br /><br /><br />
                                                
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2" onClick={handleCheckout}>CHECKOUT</button>
                                    <button type="button" className="btn btn-outlineprimary btn-sm" onClick={clearCart}>CLEAR</button>
                                </div>

                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </Layout>
     );
}




 
export default Cart;