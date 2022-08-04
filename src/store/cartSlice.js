import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
        totalCartItems: 0,
        totalCartItemsPrice: 0,
    },
    reducers: {

        // addToCart
        add(state, action) {
            let findProduct = false;
            let newProduct = {
                ...action.payload,
                qty: 1
            };
            state.carts.forEach((product, i) => {
                if (product.id === action.payload.id) {
                    product.qty += 1;
                    findProduct = true;
                    return;
                }
            })
            if (findProduct === false) {
                state.carts.push(newProduct)
            }
            state.totalCartItems += 1;
            state.totalCartItemsPrice += action.payload.price;
        },

        // removeFromCart
        remove(state, action) {
            state.totalCartItems -= action.payload.qty;
            state.totalCartItemsPrice -= action.payload.qty * action.payload.price;
            state.carts = state.carts.filter(product => product.id !== action.payload.id)
        },

        // increaseCartItem
        increament(state, action) {
            state.carts.forEach(product => {
                if(product.id === action.payload.id){
                    product.qty += 1;
                    return;
                }
            })
            state.totalCartItems += 1;
            state.totalCartItemsPrice += action.payload.price;
        },

         // decreaseCartItem
         decreament(state, action) {
            state.carts.forEach((product,idx) => {
                if(product.id === action.payload.id){
                    if(product.qty === 1){
                        state.carts.splice(idx,1);
                        return;
                    }
                    else{
                        product.qty -= 1;
                        return;
                    }
                }
            })
            state.totalCartItems -= 1;
            state.totalCartItemsPrice -= action.payload.price;
        }
    }
});



export const { add, remove, increament, decreament } = cartSlice.actions;
export default cartSlice.reducer;