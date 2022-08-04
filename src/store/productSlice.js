import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useDispatch } from 'react-redux';
// const dispatch = useDispatch();

export const STATUSES = Object.freeze({ // read only cannot change
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",

})

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        // Note: Do not call api in reducers because it causes side effect.
        // setProducts(state, action) {
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload
        // }
    },
    extraReducers: (builder) => {   
        builder
        .addCase(fetchProducts.pending,(state,action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchProducts.fulfilled,(state,action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchProducts.rejected,(state,action) => {
            state.status = STATUSES.ERROR;
        })
    }
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// thunk 
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
})
// export function fetchProducts() {
//     return async function fetchProductsThunk(dispatch, getState) {
//         // const property = getState(); for any property required for api call
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch("https://fakestoreapi.com/products");
//             const data = await res.json();
//             dispatch(setProducts(data))
//             dispatch(setStatus(STATUSES.IDLE));

//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     }
// }