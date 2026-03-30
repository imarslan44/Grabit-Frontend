// Product List Page – Optimized, NO icon libraries
// Drop-in replacement for src/pages/Products.jsx
// Uses ZERO external UI dependencies (no lucide, no icon libs)

import React, { useEffect, useState, memo } from "react";
import Productlist from "../components/Productlist.jsx";


const Products = () => {


  return (
    <section className="w-screen min-h-screen bg-gray-100 pt-14 ">
      
  {/* CONTENT */}
       
    <Productlist/>

     
    </section>
  );
};

export default memo(Products);
