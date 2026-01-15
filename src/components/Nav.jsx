import React, { useState } from 'react'
import {assets} from '../assets/assets.js';
import { NavLink, Link } from 'react-router-dom';
import Button from './Button.jsx';

const Nav = () => {
  const [ShowSidebar, setShowSidebar] = useState(false);
  return (
    <div className="w-screen fixed top-0 left-0 bg-white  flex justify-center z-100">
    <nav className=" w-[85%]   flex justify-between items-center  p-7 backdrop-blur-sm bg-primary-2     h-12 max-md:px-2 max-md:pr-4 border-b-2 border-gray-300 ">

{/* sidebar */}
{
  ShowSidebar && (
    <aside className='fixed top-14 left-0  bg-black backdrop-blur-lg  flex flex-col p-8 max-md:w-4/5 z-100 md:hidden rounded-sm'>
      {/* close button */}
      <button 
      onClick={() => setShowSidebar(false)} 
      className="text-white self-end mb-8 ">
        <ion-icon name="close-outline" className=" text-white scale-200 "></ion-icon>
      </button>
      {/* nav list */}
      <ul className=" flex flex-col space-y-8 text-white font-semibold cursor-pointer text-lg bg-black/90 ">
          <NavLink to="/" className={({isActive})=>isActive? " bg-lite-1 p-2": "p-2"} end>HOME</NavLink>
          <NavLink to="/products" className={({isActive})=>isActive? "underline text-lite-1": ""}>PRODUCTS</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive ? "underline text-lite-1": ""}>ABOUT</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive? "underline text-lite-1": "text-black"}>CONTACT</NavLink>
          
      </ul>
    </aside>
  )
}
       
{/* menu button */}
        
         {/* logo */}
        <div id="logo" className=' h-12 rounded-sm overflow-hidden flex justify-center items-center  max-md:w-20 max-md:h-10'>
            <img src={assets.logo} alt="" className="w-full h-full object-cover "/>
        </div>
        {/* nav list */}
        <nav className=" flex space-x-8 text-black font-semibold cursor-pointer text-lg max-md:hidden  w-[60%]">
            <NavLink to="/" className={({isActive})=>isActive ? " bg-lite-1 px-3 p-1 rounded text-white ": "px-3 p-1"} end>HOME</NavLink>
          <NavLink to="/products" className={({isActive})=>isActive ? " bg-lite-1 px-3 p-1 rounded text-white ": "px-3 p-1"} >PRODUCTS</NavLink>
          {/* search bar */}
          <div id="search-inout" className="w-[60%] bg-gray-100/10  rounded-xs border-b-2 p-1">
            <input type="search" placeholder='SEARCH PRODUCTS...' className="
            w-[90%]  h-full  focus:border-b-2 outline-none" />
            <button className="w-1/10 text-2xl h-9/10 ">
              <ion-icon name="search-outline"></ion-icon>
            </button>

          </div>
         
          
        </nav>

        {/* Signin SignUp */}
        <div className="flex gap-5">
          <button className="h-full p-3">
           <NavLink to="/orders" className={({isActive})=>isActive ? " bg-lite-1 px-3 p-1 rounded text-white  ": "px-3 p-1  "}>
             ORDERS
           </NavLink>
          </button>

          <NavLink to="/cart" className={({isActive})=>isActive ? " bg-lite-1 px-3 p-1 rounded text-white ": "px-3 p-1"}><ion-icon name="cart-outline" className=" h-full flex justify-center items-center text-black w-8 "></ion-icon>
          </NavLink>

          <NavLink to={"/login"} className="h-full p-3 flex justify-center items-center">
            <Button styles="bg-black ring " content={"Login"}></Button>
          </NavLink>
       <button id="menu" className="text-whtie md:hidden translate-y-0.5" onClick={()=>setShowSidebar(()=>!ShowSidebar)}>
          <ion-icon name="menu-outline" className=" text-white scale-220  "></ion-icon>
        </button>
        </div>
        
     
    </nav>
  </div>
  )
}

export default Nav