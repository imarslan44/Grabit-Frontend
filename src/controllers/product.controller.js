import { useSelector } from "react-redux"
import store from "../context/store"
import {BACKEND_URL} from "../config/env.js"
// update search error early to show error in product list page when search api fails
import { setError } from "../context/search.slice.js";
import { useDispatch } from "react-redux";

//productDetails



export const fetchProductdetail = async (id)=>{

    if(!id) return null;
    const url = `${BACKEND_URL}/api/product/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const productDetail = data.productDetail;
    return productDetail;
}


export const searchProducts = async (query, dispatch)=>{

    if(!query) return null;
    const url = `${BACKEND_URL}/api/product/search/${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    if(!data.success) {
        dispatch(setError(data.message || "Failed to fetch search results"));
        return { success: false, message: data.message };
    }
    dispatch(setError(null)); // Clear any previous errors
    const products = data.data;
    return products;
}

