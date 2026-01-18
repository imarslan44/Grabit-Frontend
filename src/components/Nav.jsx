import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Nav = () => {

  
  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-16 flex items-center justify-between gap-6">

          {/* LEFT */}
          <div className="flex items-center gap-4 ">
            <button className="text-2xl text-gray-700 flex items-baseline cursor-pointer">
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
          <div className="flex-1 flex justify-center items-center  ">
            <div className="w-full max-w-xl relative ">
              <label htmlFor="search" className="absolute right-2 top-1/2 -translate-y-1/2 text-black text-lg">
                <ion-icon name="search-outline"></ion-icon>
              </label>

              <input id="search"
                type="text"
                placeholder="Search..."
                className="w-full  h-8 pr-11 pl-2 focus:border  rounded-full  text-sm
                           placeholder-gray-500    focus:outline-none max-sm:w-10 max-sm:focus:w-60 duration-200"
              />
            </div>
          </div>

          {/* Pages Urls*/}
          <ul className="flex px-10 gap-6 items-center">

            <NavLink to="/" className="flex items-baseline text-xl gap-1">
            <ion-icon name="home-outline"></ion-icon> <li className="max-sm:hidden"> Home</li></NavLink>
            <NavLink to="/products" className="flex items-center gap-1 max-sm:h-16 ">
            <li className="">Products</li></NavLink>

          </ul>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5 text-xl text-gray-700">
            <NavLink to="/wishlist">
              <ion-icon name="heart-outline"></ion-icon>
            </NavLink>

            <NavLink to="/cart">
              <ion-icon name="bag-outline"></ion-icon>
            </NavLink>

            <NavLink to="/profile">
              <ion-icon name="person-outline"></ion-icon>
            </NavLink>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Nav;
