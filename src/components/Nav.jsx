import React, { use } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
let SELLER_SITE = "https://barket-seller.vercel.app/";

import NavLinks from "./NavLinks";
const Nav = () => {
  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 w-full     z-100 h-15 ">

      <div className="max-w-[1400px] h-full mx-auto px-2 md:px-6">
        <div className="h-full  flex items-center justify-between gap-2">

          {/* LEFT */}
          <div className="flex items-center gap-4 ">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-2xl text-gray-700  cursor-pointer bg-white rounded h-10 w-12 justify-center items-center flex">
              <ion-icon name="grid-outline"></ion-icon>
            </button>

            <NavLink to="/" className="flex items-baseline font-serif text-gray-800 gap-2 h-12 font-semibold max-md:hidden">
              {/* <img
                src={""}
                alt="Logo"
                className="h-6 w-auto object-contain"
              /> */} <h2 className="bg-white rounded overflow-hidden"><img src={assets.logo} alt="" width={160}
                className="bg-black h-12 rounded overflow-hidden"
              /></h2>
            </NavLink>
          </div>
          <p className="text-2xl text-cennter absolute left-1/2  -translate-x-1/2 z-90 sm:hidden text-gray-500">Explore</p>

          {/* CENTER SEARCH */}
          <div className=" flex flex-1 justify-center items-center   rounded-sm z-100 ">
            <div className="w-full  max-w-xl relative rounded-sm overflow-hidden">
              <label htmlFor="search" className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-2xl">
                <ion-icon name="search-outline"></ion-icon>
              </label>

              <input id="search"
                type="text"
                placeholder="Search..."
                className="w-[0] focus:w-85 h-12 pr-11 pl-2 focus:bg-white  outline-none  rounded-sm  text-xl p-4
                           placeholder-gray-600       duration-200"
              />
            </div>
          </div>
            <NavLinks styles="max-sm:hidden "/>
        

        </div>
      </div>
      {/* sidebar */}

      <aside onClick={() => setIsSidebarOpen(false)}

        className={` bg-black  md:block  fixed top-14 h-screen   border- ${isSidebarOpen ? "opacity-100 w-screen" : " w-0 opacity-50"}  md:static  transition-all duration-200 ease-in-out z-50 overflow-hidden`}>

        <ul className="bg-white w-52 flex flex-col h-full gap-4 p-4 text-black  text-lg font-medium shadow ">
          <div className=" -translate-x-8"><img src={assets.logo} alt="" width={200} /></div>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/login">Logout</NavLink>
          <a href={SELLER_SITE} target="_blank">
            Become a Seller
          </a>
        </ul>

      </aside>
    </header>
  );
};

export default Nav;
