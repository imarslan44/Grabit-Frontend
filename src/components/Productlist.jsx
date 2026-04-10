import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../config/env.js";
import { LoadProducts } from "../context/productsSlice.js";
import Card from "../components/Card";
import { use } from "react";

const Productlist = () => {

  // export const getProductList = async (req, res)=>{
  // //productList for admin
  // let index = req.query.index || 0;
  // try{ 
  //     //pagination can be implemented here using index and limit
  //     const productList = await Product.find().skip(index).limit(20);
  
  //     if(!productList) return res.status(500).json('something went wrong')
  
  //     return res.status(200).json({
  //         success: true,
  //         message: "product list retrieved",
  //         data: productList 
  
  //     })
      
  
  // }catch(error){
  //     res.status(error?.statusCode || 500 ).json(error.message)
  // }
  // }

   const [items, setItems] = useState([]);
   const [page, setPage] = useState(1);

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   const dispatch = useDispatch();

   const fetchProducts = async (controller, page) => {
    let index = (page - 1) * 10; // Calculate the index based on the page number
    const pageQuery = `index=${index}`;
     try {
      //pagination can be implemented here using index and limit
        
        const url = `${BACKEND_URL}/api/product?${pageQuery}`;
        console.log("Fetching products from:", url);
        const res = await fetch(url, { signal: controller.signal, method: "GET"});
    
      


        console.log("Fetch response status:", res);
         if (!res.ok) throw new Error();
         const data = await res.json();
         console.log("Fetched products:", data);
         const list = data?.data || [];
        
         setItems((prev) => [...prev, ...list]);
         dispatch(LoadProducts(items));
        
       } catch (e) {
        console.log("error", e)
         if (e.name !== "AbortError") setError(true);
       } finally {
         
         setLoading(false);
       }
    };
 
   useEffect(() => {
    const controller = new AbortController();
     fetchProducts(controller, page);
   // return () => controller.abort();
   return () => {
    console.log("Aborting fetch for products");
    controller.abort();
    };
   }, []);

   useEffect(() => {
    if (page === 1) return; 
    const controller = new AbortController();
    fetchProducts(controller, page);
    return () => {
      console.log("Aborting fetch for products on page change");
      controller.abort();
    }
    }, [page]);


  return (
     <main className="bg-white-bg w-screen min-h-50 rounded-xs sm:px-5 lg:px-10 pt-8">
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

        <ul className=" bg-gray-100  rounded columns-2 md:columns-3 lg:columns-5 p-3 relative pb-16">
             {items.map((item, i) => (
             <Card key={item._id || i} item={item} styles="mb-2 break-inside-avoid" />
          ))}
          <button onClick={() => setPage((prev) => prev + 1)}
           className="bg-gray-300 min-w-md hover:bg-gray-400 text-white font-bold py-2 px-4  rounded-xs absolute left-1/2 bottom-0 transform -translate-x-1/2 cursor-pointer">
            Load More <ion-icon name="caret-down-outline" className="translate-y-1"></ion-icon>
          </button>
        </ul>

        </main>
  )
}

export default memo(Productlist)