import React, { useState, useEffect } from 'react';
import { add } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts,STATUSES } from "../store/productSlice";



const Products = () => {
    const dispatch = useDispatch();
    const {data:products,status} = useSelector((state) => state.product);
    console.log(products)

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    const addToCart = (product) => {
        dispatch(add(product));
    }
    if(status === STATUSES.LOADING){
        return (
            <h1>Loading.....</h1>
            )
    }
    else if(status === STATUSES.ERROR){
        return (
            <h1>Error occured</h1>
            )
    }

    return (
        <div className="productsWrapper">
            {products.map(product => {
                return (
                    <div className="card" key={product.id}>
                        <img src={product.image} alt="" />
                        <h4>{product.title}</h4>
                        <h5>${product.price}</h5>
                        <button onClick={() => addToCart(product)} className="btn">
                            Add to cart
                        </button>
                    </div>
                )
            })

            }
        </div>
    );
};

export default Products;