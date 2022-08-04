
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {remove,increament,decreament} from "../store/cartSlice"
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.carts);
    const dispatch = useDispatch();

    // remove product
    const removeProduct = (product) => {
        dispatch(remove(product))
    }

    // increament product
    const increamentQty = (product) => {
        dispatch(increament(product))
    }

    // decreament product
    const decreamentQty = (product) => {
        dispatch(decreament(product))
    }

    return (
        <div>
            <h3>Cart</h3>
            <div className="cartWrapper">
                {cartItems.map((product) => {
                    return (
                        <div key={product.id} className="cartCard">
                            <img src={product.image} alt="" />
                            <h5>{product.title}</h5>
                            <h5>${product.price}</h5>
                            <div>
                                <button onClick={() => decreamentQty(product)} className='cartButton'>-</button>
                                <span style={{margin: "10px"}}>{product.qty}</span>
                                <button onClick={() => increamentQty(product)} className='cartButton'>+</button>
                            </div>
                            <button
                                className="btn"
                                onClick={() => removeProduct(product)}
                            >
                                Remove
                            </button>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
};

export default Cart;