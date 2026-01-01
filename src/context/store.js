//import configureStore form reduxtoolkit
import {configureStore} from "@reduxjs/toolkit";
import ProductsReducer from "./productsSlice.js" 
import CartReducers from "./cartSlice.js";
import authReducers from "./auth.slice.js";
import OrderReducers from "./order.slice.js";
const store = configureStore(
    {
     reducer: {
        products: ProductsReducer, 
        cart: CartReducers,
        auth: authReducers,
        order: OrderReducers
     }
    }
);
export default store;