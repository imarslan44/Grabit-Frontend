import React, { useState } from 'react'
import { ProductList } from '../assets/assets';
const Cart = () => {
  const [CartItems, setCartItems] = useState(ProductList);


  return (
    <div className="w-screen min-h-screen bg-primary-2 p-14 flex justify-center items center text-black ">
      {/* header */}
      
      {
        CartItems !== "" ? (
          // cart list
          <ul className="w-full h-full flex flex-col">
            <header className="bg-black  text-primary-2 uppercase font-semibold text-lg p-2 w-1/2 max-md:w-full"><h1>Items In cart</h1></header>
            {
              CartItems.map((item)=>(
               <li className="flex flex-col bg-primary-2 rounded my-1 shadow-md w-1/2 max-md:w-full p-3 max-md:scale-90">
                <div className="flex justify-between pr-2">

               
                <div className="w-[75%] flex items-center gap-2 border-b border-gray-500">
                <img src={item.images[0]} alt="" className="w-10 h-10  rounded"/> <p>{item.name}</p>
                 </div>

                <div className="flex gap-2 items-center border w-[20%] p-2 rounded border-gray-500">
               <span className="text-gray-500">Rs{item.price}</span>
                <button className="p-1 px-3 bg-primary-1 cursor-pointer rounded text-white duration-200 hover:scale-105 text-sm">
                BUY
               </button>
                </div>
                </div>
               <div className="block">
                <span className="text-gray-400">Quantity:{"1"}</span>
               </div>

               
               </li>
              ))
            }
          </ul>
        ) : (
        <>
        <h1 className="text-secondary-1">('●◡●') No Items added! </h1>
        </>)

        }
    </div>
  )
}

export default Cart