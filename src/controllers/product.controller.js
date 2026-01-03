import { useSelector } from "react-redux"
import store from "../context/store"
import {BACKEND_URL} from "../config/env.js"
//productDetails


export const fetchProductdetail = async (id)=>{

  if(!id) return console.log("id is missing");
    const url = `${BACKEND_URL}/api/product/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const productDetail = data.productDetail;
    return productDetail;
}

