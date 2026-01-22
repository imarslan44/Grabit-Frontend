// Product List Page – Optimized, NO icon libraries
// Drop-in replacement for src/pages/Products.jsx
// Uses ZERO external UI dependencies (no lucide, no icon libs)

import React, { useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../config/env.js";
import { LoadProducts } from "../context/productsSlice.js";
import Card from "../components/Card";
import Productlist from "../components/productlist.jsx";


const Products = () => {


  return (
    <section className="w-screen min-h-screen bg-gray-100 pt-14 ">
      
  {/* CONTENT */}
       
    <Productlist/>

     
    </section>
  );
};

export default memo(Products);
