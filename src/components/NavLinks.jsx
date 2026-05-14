
import React from "react";  
import { Links } from "react-router-dom";
import { NavLink } from "react-router-dom";

const NavLinks = ({styles, textColor }) => {
    return (
          
          <ul className={`flex flex-1 items-baseline  gap-5 justify- text-xl text-gray-700 bg-white p-1 rounded justify-around ${styles}`}>
            {/* Pages Urls*/}

              <NavLink to="/" className={({ isActive }) => `flex items-center md:gap-1 text-black border-b-2 p-1 text-3xl  ${isActive ? `border-${textColor || 'black'}` : "border-transparent"} text-${textColor}`} >
                <ion-icon name="home"></ion-icon> <li className="max-sm:hidden"></li></NavLink>

              <NavLink to="/products" className={({ isActive }) => `flex items-center md:gap-1 text-black text-3xl border-b-2 p-1  ${isActive ? `border-${textColor || 'black'}` : "border-transparent"} text-${textColor}`} ><ion-icon name="storefront"></ion-icon>
                <li className="max-sm:hidden"></li></NavLink>
            


            
              {/* <NavLink to="/wishlist">
              <ion-icon name="heart-outline"></ion-icon>
            </NavLink> */}

              <NavLink to="/cart"
                className={({ isActive }) => `flex items-center md:gap-1 text-black text-3xl border-b-2 p-1  ${isActive ? `border-${textColor || 'black'}` : "border-transparent"} text-${textColor}`} >
               <ion-icon name="cart"></ion-icon>
              </NavLink>

              <NavLink to="/profile"
                className={({ isActive }) => `flex items-center md:gap-1 text-black text-3xl border-b-2 p-1  ${isActive ? `border-${textColor || 'black'}` : "border-transparent"} text-${textColor}`} >
                <ion-icon name="person"></ion-icon>
              </NavLink>
        
          </ul>
    )
}

export default NavLinks;
