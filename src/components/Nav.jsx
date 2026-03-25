import React, { use } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Nav = () => {
// Sidebar toggle state
const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  
  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-100 h-15 ">
      <div className="max-w-[1400px] h-full mx-auto px-2 md:px-6">
        <div className="h-full  flex items-center justify-between gap-2">

          {/* LEFT */}
          <div className="flex items-center gap-4 ">
            <button onClick={()=>setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl text-gray-700 flex items-baseline cursor-pointer">
              <ion-icon name="menu-outline"></ion-icon>
            </button>

            <NavLink to="/" className="flex items-baseline font-serif text-gray-800 gap-2 font-semibold max-md:hidden">
              {/* <img
                src={""}
                alt="Logo"
                className="h-6 w-auto object-contain"
              /> */} <h2><img src={assets.logo} alt="" width={200} /></h2>
            </NavLink>
          </div>

          {/* CENTER SEARCH */}
          <div className=" flex flex-1 justify-center items-center  bg-gray-100 rounded-sm">
            <div className="w-full  max-w-xl relative rounded-sm overflow-hidden">
              <label htmlFor="search" className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-lg">
                <ion-icon name="search-outline"></ion-icon>
              </label>

              <input id="search"
                type="text"
                placeholder="Search..."
                className="w-full focus:w-60 h-9 pr-11 pl-2 border border-gray-200 outline-gray-400  rounded-sm  text-lg
                           placeholder-gray-600       duration-200"
              />
            </div>
          </div>

          {/* Pages Urls*/}
          <ul className="flex flex-1 items-baseline  gap-5 justify-between text-xl text-gray-700">
            <div className="flex gap-5">

            <NavLink to="/" className={({ isActive }) =>  `flex items-center md:gap-1 text-gray-700 border-b-2 p-1  ${ isActive ? "border-black" : "border-transparent" }` } >
            <ion-icon name="home-outline"></ion-icon> <li className="max-sm:hidden">Home</li></NavLink>

            <NavLink to="/products"   className={({ isActive }) => `flex items-center md:gap-1 text-gray-700 border-b-2 p-1  ${ isActive ? "border-black" : "border-transparent" }` } ><ion-icon name="storefront-outline"></ion-icon>
            <li className="max-sm:hidden">Products</li></NavLink>
         </div>
          

         <div className="flex gap-5">
            {/* <NavLink to="/wishlist">
              <ion-icon name="heart-outline"></ion-icon>
            </NavLink> */}

            <NavLink to="/cart"
             className={({ isActive }) =>  `flex items-center md:gap-1 text-gray-700 border-b-2 p-1  ${ isActive ? "border-black" : "border-transparent" }` } >
              <ion-icon name="cart-outline"></ion-icon>
            </NavLink>

            <NavLink to="/profile"
             className={({ isActive }) =>  `flex items-center md:gap-1 text-gray-700 border-b-2 p-1  ${ isActive ? "border-black" : "border-transparent" }` } >
              <ion-icon name="person-outline"></ion-icon>
            </NavLink>
          </div>
        </ul>

        </div>
      </div>
{/* sidebar */}

      <aside onClick={()=>setIsSidebarOpen(false)}

       className={` backdrop-blur-sm   md:block  fixed top-14 h-screen border  border-gray-200 ${isSidebarOpen ? "opacity-100 w-screen" : " w-0 opacity-50"}  md:static  transition-all duration-200 ease-in-out z-50 overflow-hidden`}>

        <ul className="bg-white w-52 flex flex-col h-full gap-4 p-4 text-gray-700  text-sm font-medium shadow ">
          <div className=" -translate-x-8"><img src={assets.logo} alt="" width={200} /></div>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/login">Logout</NavLink>
            <a href={"http://localhost:3000"} target="_blank">
            Become a Seller
            </a>
        </ul>

      </aside>
    </header>
  );
};

export default Nav;
