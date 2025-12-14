//import configureStore form reduxtoolkit
import {configureStore} from "@reduxjs/toolkit";
import ProductsReducer from "./productsSlice.js" 
import CartReducers from "./cartSlice.js";
const store = configureStore(
    {
     reducer: {
        products: ProductsReducer, 
        cart: CartReducers
     }
    }
);
export default store;