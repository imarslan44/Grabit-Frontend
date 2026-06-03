// Product List Page – Optimized, NO icon libraries
// Drop-in replacement for src/pages/Products.jsx
// Uses ZERO external UI dependencies (no lucide, no icon libs)

import React, { useEffect, useState, memo } from "react";
import Productlist from "../components/Productlist.jsx";


const Products = () => {


  return (
    <section className="w-screen min-h-screen bg-gray-100 pt-14 overflow-hidden relative max-sm:pb-16">
      {/* background  */}
      <div className="w-[200vw] h-[150vw] rounded-full bg-black absolute -top-90 md:-translate-y-[60%] md:-left-[90%] right-8 z-0">
 
      </div>
  {/* CONTENT */}
    <div className="w-screen h-screen overflow-y-auto overflow-x-hidden">
    <Productlist/>
    </div>

     
    </section>
  );
};

export default memo(Products);
