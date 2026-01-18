// Product List Page – Optimized, NO icon libraries
// Drop-in replacement for src/pages/Products.jsx
// Uses ZERO external UI dependencies (no lucide, no icon libs)

import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../config/env.js";
import { LoadProducts } from "../context/productsSlice.js";
import Card from "../components/Card";

// Simple inline SVGs (tree-shakeable, zero cost)
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 21s-7-4.35-9.5-8A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 7c-2.5 3.65-9.5 8-9.5 8z" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M13.7 21a2 2 0 01-3.4 0" stroke="currentColor" strokeWidth="2"/></svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5"><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M5.5 21a6.5 6.5 0 0113 0" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
);

const Products = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/product`, { signal: controller.signal });
        if (!res.ok) throw new Error();
        const data = await res.json();
        const list = data?.data || [];
        setItems(list);
        dispatch(LoadProducts(list));
      } catch (e) {
        if (e.name !== "AbortError") setError(true);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [dispatch]);

  return (
    <section className="w-screen md:min-h-screen bg-gray-100  ">
      {/* NAVBAR */}
      

      
        {/* SIDEBAR */}
        {/* <aside className="hidden md:block bg-white rounded-xl p-5 h-fit">
          <h3 className="font-semibold mb-3">All Categories</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home</li>
          </ul>

          <hr className="my-4" />
          <h3 className="font-semibold mb-3">Price</h3>
          <input type="range" className="w-full" />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>₹200</span><span>₹1500</span></div>

          <hr className="my-4" />
          <h3 className="font-semibold mb-3">Customer Ratings</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>4★ & above</p><p>3★ & above</p><p>2★ & above</p><p>1★ & above</p>
          </div>
        </aside> */}

        {/* CONTENT */}
        <main className="bg-white w-full rounded-xs sm:px-5 lg:px-10 pt-10 p-3 ">
          <div className="flex  sm:flex-row sm:justify-between gap-6 md:gap-4 mb-6 ">
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

          {loading && <div className="py-20 text-center text-gray-500">Loading…</div>}
          {error && <div className="py-20 text-center text-red-500">Failed to load products</div>}

        <div className="columns-2 md:columns-3 lg:grid grid-cols-5 gap-3 p-2 ">
  {items.map((item, i) => (
    <Card key={item._id || i} item={item} styles="mb-2 break-inside-avoid" />
  ))}
</div>



        </main>
    

      {/* MOBILE SEARCH */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-full shadow-lg flex items-center px-4 py-2">
        <SearchIcon />
        <input className="ml-2 w-full text-sm outline-none" placeholder="Search products" />
      </div>
    </section>
  );
};

export default memo(Products);
