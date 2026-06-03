import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../config/env.js";
import { LoadProducts } from "../context/productsSlice.js";
import Card from "../components/Card";
import { use } from "react";
import { searchProducts } from "../controllers/product.controller.js";
import { useSelector } from "react-redux";

//import neceessory fuction for global state management for search functionality to show search results in product list page
import { setQuery, setLoading, setError, setResults } from "../context/search.slice.js";


const Productlist = () => {




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
      setLoading(true)
      const url = `${BACKEND_URL}/api/product?${pageQuery}`;
      const res = await fetch(url, { signal: controller.signal, method: "GET" });

      if (!res.ok) throw new Error();
      const data = await res.json();
      
      const list = data?.data || [];

      // Update items: replace on first page, append on subsequent pages
      setItems((prev) => {
        const newItems = page === 1 ? list : [...prev, ...list];
        dispatch(LoadProducts(newItems));
        return newItems;
      });
      setLoading(false)

    } catch (e) {
      if (e.name !== "AbortError") setError(true);
    } finally {

      setLoading(false);
    }
  };

  //change product list when search results are updated in global state
  const searchQuery = useSelector((state) => state.search.query);
  const searchResults = useSelector((state) => state.search.results);
  const searchLoading = useSelector((state) => state.search.loading);
  const searchError = useSelector((state) => state.search.error);


  useEffect(() => {
    if (searchQuery) {
      setItems(searchResults);
      setLoading(searchLoading);
      
    } else {
      setItems([]);
      setPage(1);
      setLoading(true);
      setError(false);
      const controller = new AbortController();
      fetchProducts(controller, 1);
      return () => controller.abort();
    }
  }, [searchQuery, searchResults, searchLoading, searchError]);
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller, page);
    // return () => controller.abort();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (page === 1) return;
    const controller = new AbortController();
    fetchProducts(controller, page);
    return () => controller.abort();
  }, [page]);

  // dont set scroll smooth for this  skip this list dont show its scrolling
 

  return (
    <main className=" w-screen   rounded-xs sm:px-5 lg:px-10 pt-8 z-90 pb-10">
      <div className="flex  sm:flex-row sm:justify-between gap-6 md:gap-4 mb-6 px-3 z-10 ">
        <div>
          <h2 className="text-lg text-gray-500 md:text-2xl  font-medium  tracking-tight uppercase z-90">Explore items.</h2>
          <p className="text-sm text-gray-500 z-10">Showing 1–{items.length} of {items.length} Products</p>
        </div>
        <select className="border max-sm:border-gray-300 h-8 font-medium text-gray-500  rounded-xs px-3  text-sm w-fit z-10">
          <option>Most Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      
        {loading && <div className={`py-30  h-full text-center text-xl text-gray-700 p-15  `}>  Loading…</div>}

      {error && <div className="py-30 h-78 text-center ">
        <p className="text-gray-700">Failed to load products</p>
        <button className="px-8 py-2 text-md font-semibold bg-blue-400 rounded cursor-pointer">
          Retry
        </button>
      </div>}

       {
        searchError && <div className="py-30 h-78 text-center w-screen    text-xl">
            <p className="text-gray-700">Failed to load search results.</p>
          </div>
        }




 <hr  className="  border-gray-300 mx-2 md:mx-5 my-5"/>
      
{/* masnoary layout for products */}
      <ul className=" rounded columns-2 p-2 relative gap-2 md:gap-5 sm:[columns:unset] sm:grid sm:grid-cols-3 lg:grid-cols-5 md:pb-10">
        {items.length > 0 && items?.map((item, i) => (
          <Card key={item._id || i} item={item} styles="mb-2 break-inside-avoid" />
        ))}

       
        

{ items.length > 0 && loading && <div className={`py-30  h-full text-center text-xl text-gray-700 p-15  `}>  Loading…</div>}

      { items.length > 0 && !loading && 
        <button onClick={() => setPage((prev) => prev + 1)}
          className={` bg-black min-w-md hover:bg-gray-900 text-white font-bold py-2 px-4  rounded-xs absolute left-1/2 bottom-0 transform -translate-x-1/2 cursor-pointer ${items.length < 10  || loading ? "hidden" : ""}`}>
          Load More <ion-icon name="caret-down-outline" className="translate-y-1"></ion-icon>

        </button>
}
      </ul>

    </main>
  )
}

export default memo(Productlist)