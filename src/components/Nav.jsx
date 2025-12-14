import React, { useState } from 'react'
import {assets} from '../assets/assets.js';
import { NavLink, Link } from 'react-router-dom';
import Button from './Button.jsx';

const Nav = () => {
  const [ShowSidebar, setShowSidebar] = useState(false);
  return (
    <nav className=" w-full flex justify-between items-center py-3 px-16  backdrop-blur-sm bg-primary-2  fixed top-0 z-100 h-12 max-md:px-2 max-md:pr-4 border-b ">

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
          <NavLink to="/" className={({isActive})=>isActive? "underline text-lite-1": ""} end>HOME</NavLink>
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
        <nav className=" flex space-x-8 text-black font-semibold cursor-pointer text-lg max-md:hidden">
            <NavLink to="/" className={({isActive})=>isActive ? "underline text-lite-1": "text-black"} end>HOME</NavLink>
          <NavLink to="/products" className={({isActive})=>isActive ? "underline text-lite-1": "text-black"} >PRODUCTS</NavLink>
          <NavLink to="/about"  className={({isActive})=>isActive ? "underline text-lite-1": "text-black"}>ABOUT</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive ? "underline text-lite-1": "text-black"}>CONTACT</NavLink>
          
        </nav>

        {/* Signin SignUp */}
        <div className="flex gap-5">
          <NavLink to="/cart" className="  rounded-sm h-full flex justify-center items-center "><ion-icon name="cart-outline" className="text-black w-8 h-8"></ion-icon>
          </NavLink>
<NavLink to={"/signIn/signUp"}>
            <Button styles="bg-black ring " content={"Login"}></Button>
</NavLink>
       <button id="menu" className="text-whtie md:hidden translate-y-0.5" onClick={()=>setShowSidebar(()=>!ShowSidebar)}>
          <ion-icon name="menu-outline" className=" text-white scale-220  "></ion-icon>
        </button>
        </div>
        
     
    </nav>
  )
}

export default Nav