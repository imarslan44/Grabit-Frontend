import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import React, {useEffect} from "react";
import { ProductList } from "../assets/assets";

const initialState = {
    products: [],
    loading: false,
    error: false
};

const productsSlice = createSlice({
name:"products",
initialState,
reducer:{
loead:()=> {
    return;
},
},

extraReducers: (builder)=>{
    builder.addCase(LoadProducts.pending, (state, action)=>{
        state.loading = true
    }).addCase(LoadProducts.fulfilled, (state, action)=>{
        state.products = action.payload;
    } )

}
   
})

export  const LoadProducts = createAsyncThunk(
    "Products/LoadProducts", 
    async (products)=>{
        await new Promise((resolve)=>setTimeout(resolve, 200));
        return products
    }
);





 const ProductsReducer = productsSlice.reducer
 export default ProductsReducer;