import React, { useState } from 'react'
import assets from '../assets/assets.js';
const Nav = ({styles}) => {
  const [ShowSidebar, setShowSidebar] = useState(false);
  return (
    <nav className={` w-full flex justify-between items-center py-4 px-16  backdrop-blur-lg bg-black/75  fixed top-0 z-100 h-18 max-md:px-2 max-md:pr-4 ${styles} `}>

{/* sidebar */}
{
  ShowSidebar && (
    <aside className='fixed top-14 left-0  bg-black backdrop-blur-lg  flex flex-col p-8 max-md:w-4/5 z-100 md:hidden '>
      {/* close button */}
      <button 
      onClick={() => setShowSidebar(false)} 
      className="text-white self-end mb-8 ">
        <ion-icon name="close-outline" className=" text-white scale-200 "></ion-icon>
      </button>
      {/* nav list */}
      <ul className=" flex flex-col space-y-8 text-white font-semibold cursor-pointer text-lg bg-black/90 ">
          <li>HOME</li>
          <li>Products</li>
          <li>ABOUT</li>
          <li>CONTACT</li>
      </ul>
    </aside>
  )
}
       
{/* menu button */}
        
         {/* logo */}
        <div id="logo" className='w-32 h-14 rounded-sm overflow-hidden flex justify-center items-center  max-md:w-20 max-md:h-10'>
            <img src={assets.logo} alt="" className="w-full h-full object-cover "/>
        </div>
        {/* nav list */}
        <ul className=" flex space-x-8 text-white font-semibold cursor-pointer text-lg max-md:hidden">
            <li>HOME</li>
            <li>CATEGORIES</li>
             <li>ABOUT</li>
            <li>CONTACT</li>
        </ul>

        {/* Signin SignUp */}
        <div>
            <button className=' hover:bg-orange-600 border text-white px-4 py-2 rounded-md mr-4 bg-black transition border-orange-600 max-md:text-sm max-md:p-1 max-md:px-2 '>SignIn/SignUp</button>

            <button id="menu" className="text-whtie md:hidden translate-y-0.5" onClick={()=>setShowSidebar(()=>!ShowSidebar)}>
          <ion-icon name="menu-outline" className=" text-white scale-220 "></ion-icon>
        </button>
        </div>
        
     
    </nav>
  )
}

export default Nav