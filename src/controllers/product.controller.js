import { useSelector } from "react-redux"
import store from "../context/store"
//productDetails

export const getProdctDetails = (id)=>{
    const state = store.getState();
    const {products} = state.products;
    
    const currentProduct = products.filter((item)=>item._id === id);
    const product = currentProduct[0] ;
    
    return product  !== false ? product : console.log("error finding product");

}