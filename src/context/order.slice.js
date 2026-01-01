import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    product: null,
    productId : null,
    variantIndex: null,
    sizeIndex: null,
    quantity: 1,
    address: null
}


const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        updateProduct : (state, action)=>{
            state.product = action.payload.product;
            state.productId = action.payload.productId;
            state.variantIndex = action.payload.variantIndex;
            state.sizeIndex = action.payload.sizeIndex;
           
        },
        updateAddress: (state, action) =>{
            state.address = action.payload;
        },
        updateQuantity: (state, action)=>{
            state.quantity = action.payload;
        }
    }
});

export const {updateProduct, updateQuantity, updateAddress} = OrderSlice.actions;

const OrderReducers = OrderSlice.reducer;
export default OrderReducers
