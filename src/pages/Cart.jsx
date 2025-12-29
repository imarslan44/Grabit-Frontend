import React, { useEffect, useState } from 'react'
import { getCartItems } from '../controllers/cart.controller';
import { Link } from 'react-router-dom';
import { deleteCartItem } from '../controllers/cart.controller.js';

const Cart = () => {


  const [CartItems, setCartItems] = useState([]);


  const fetchCartItems = async()=>{
    const {cartItems} = await getCartItems();
    console.log(cartItems)
    setCartItems(cartItems)
  }

  useEffect(() => {
    fetchCartItems()
  }, [])
  
  const handleDelete = async(id)=>{
    const data = await deleteCartItem(id);
    if(data.success){
      const cartItemsCopy = [...CartItems];
      const leftItems = cartItemsCopy.filter((item)=> item._id !== id);
      setCartItems(leftItems)
    }

  }
  



  return (
    <div className="w-screen min-h-screen bg-primary-2 p-14 flex justify-center items center text-black ">
      {/* header */}
      
      {
        CartItems !== "" ? (
          // cart list
          <ul className="w-full h-full flex flex-col">
            <header className="bg-black  text-primary-2 uppercase font-semibold text-lg p-2 w-1/2 max-md:w-full"><h1> Items In cart </h1></header>
          
            {
           CartItems?.length > 0 &&  CartItems.map((item)=>(
            <li key={item._id} className="flex flex-col bg-primary-2 rounded my-1 shadow-md w-1/2 max-md:w-full p-3 max-md:scale-90 relative pt-9">
              <button 
                onClick={()=>handleDelete(item._id)}
                className=" shadow flex justify-center items-center p-2 w-6 h-6 rounded-xs absolute top-1 right-1 cursor-pointer">

                  <ion-icon className="text-xl scale-250 hover:text-red-400" name="close-outline"></ion-icon>
                </button>
               <Link to={`/product/${item.productId}`} >
                
                <div className="flex justify-between pr-2">

               
                <div className="w-[75%] flex items-center gap-2 border-b border-gray-500">
                <img src={item?.variant?.images[0]} alt="" className="w-10 h-10  rounded"/> <p>{item.title}</p>
                 </div>

                <div className="flex gap-2 items-center border w-[20%] p-2 rounded border-gray-500">
               <span className="text-gray-500">Rs{item?.variant?.price}</span>
                <Link to="/order/place" className="p-1 px-3 bg-primary-1 cursor-pointer rounded text-white duration-200 hover:scale-105 text-sm">
                BUY
               </Link>
                </div>
                </div>
               <div className="block">
                <span className="text-gray-400">Quantity:{item?.quantity}</span>
               </div>
                

               </Link>
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