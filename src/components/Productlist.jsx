import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../config/env.js";
import { LoadProducts } from "../context/productsSlice.js";
import Card from "../components/Card";

const Productlist = () => {

   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const dispatch = useDispatch();

   const fetchProducts = async (controller) => {
     try {
         const res = await fetch(`${BACKEND_URL}/api/product`, {signal : controller.signal});
        
         if (!res.ok) throw new Error();
         const data = await res.json();
         const list = data?.data || [];
         setItems(list);
         dispatch(LoadProducts(list));
      
       } catch (e) {
         console.log("error", e)
         if (e.name !== "AbortError") setError(true);
       } finally {
         
         setLoading(false);
       }
    };
 
    const DeleteProduct = async(id)=>{
      try{
        const URL = `${BACKEND_URL}/api/product/delete/${id}`

      }catch(err){
        console.log(err)
      }
    }
   useEffect(() => {
    const controller = new AbortController();
     fetchProducts(controller);
    return () => controller.abort();
   }, []);

  return (
     <main className="bg-amber-50/30 w-screen min-h-50 rounded-xs sm:px-5 lg:px-10 pt-8">
          <div className="flex  sm:flex-row sm:justify-between gap-6 md:gap-4 mb-6 px-3">
            <div>
              <h2 className="text-lg text-gray-700 md:text-2xl  font-medium  tracking-tight uppercase">Explore items.</h2>
              <p className="text-sm text-gray-500">Showing 1–{items.length} of {items.length} Products</p>
            </div>
            <select className="border max-sm:border-gray-300 h-8 font-medium text-gray-600 rounded-xs px-3  text-sm w-fit">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {loading && <div className="py-20 text-center text-xl text-gray-900 p-10">Loading…</div>}
          {error && <div className="py-20 text-center text-red-500">Failed to load products</div>}

        <ul className="columns-2 md:columns-3 lg:columns-5 p-3 ">
             {items.map((item, i) => (
             <Card key={item._id || i} item={item} styles="mb-2 break-inside-avoid" />
          ))}
        </ul>



        </main>
  )
}

export default memo(Productlist)