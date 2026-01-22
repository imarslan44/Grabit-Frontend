import React, { use } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Nav = () => {
// Sidebar toggle state
const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  
  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 h-15 ">
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
              /> */} <h2>GrabIt</h2>
            </NavLink>
          </div>

          {/* CENTER SEARCH */}
          <div className=" flex flex-1 justify-center items-center  bg-orange-50 rounded-sm">
            <div className="w-full max-w-xl relative ">
              <label htmlFor="search" className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-lg">
                <ion-icon name="search-outline"></ion-icon>
              </label>

              <input id="search"
                type="text"
                placeholder="Search..."
                className="w-full  h-8 pr-11 pl-2 border border-gray-200 rounded-sm  text-sm
                           placeholder-gray-500       duration-200"
              />
            </div>
          </div>

          {/* Pages Urls*/}
          <ul className="flex flex-1 items-baseline  gap-5 justify-between text-xl text-gray-700">
            <div className="flex gap-5">

            <NavLink to="/" className={({ isActive }) => `flex items-center md:gap-1 text-gray-700 ${ isActive ? "text-orange-300 " : "" }` } >
            <ion-icon name="home-outline"></ion-icon> <li className="max-sm:hidden"> Home</li></NavLink>

            <NavLink to="/products"   className={({ isActive }) => `flex items-center md:gap-1 text-gray-700 ${ isActive ? "text-orange-300 " : "" }` } ><ion-icon name="storefront-outline"></ion-icon>
            <li className="max-sm:hidden">Products</li></NavLink>
         </div>
          

         <div className="flex gap-5">
            {/* <NavLink to="/wishlist">
              <ion-icon name="heart-outline"></ion-icon>
            </NavLink> */}

            <NavLink to="/cart"
             className={({ isActive }) => `flex items-center md:gap-1 text-gray-700 ${ isActive ? "text-orange-300 " : "" }` } >
              <ion-icon name="bag-outline"></ion-icon>
            </NavLink>

            <NavLink to="/profile"
             className={({ isActive }) => `flex items-center md:gap-1 text-gray-700 ${ isActive ? "text-orange-300 " : "" }` } >
              <ion-icon name="person-outline"></ion-icon>
            </NavLink>
          </div>
        </ul>

        </div>
      </div>
{/* sidebar */}

      <aside className={`bg-lime-400/20 backdrop-blur-sm   md:block w-full fixed top-14 left-0 h-screen border-r border-gray-200 ${isSidebarOpen? "left-0 opacity-100": "scale-0 opacity-50"}  md:static md:w-auto transition-all duration-800 ease-in-out z-50`}>
        <ul className="bg-white w-48 flex flex-col h-full gap-4 p-4 text-gray-700  text-sm font-medium shadow">
          <a href={"/"} target="_blank" >Become a Seller</a>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/login">Logout</NavLink>
        </ul>

      </aside>
    </header>
  );
};

export default Nav;
