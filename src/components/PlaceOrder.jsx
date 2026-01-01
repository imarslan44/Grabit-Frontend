import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProduct, updateQuantity, updateAddress } from '../context/order.slice'


const PlaceOrder = () => {

  const {product, productId, variantIndex, sizeIndex, quantity} = useSelector((state)=>state.order);
  
  const currentVarient = product.variants[variantIndex];
  const currentSize = currentVarient?.sizes?.[sizeIndex];
  
  const price = currentSize?.price || currentVarient.price
  const shippingFee = 40
  const isCOD = product?.COD || false

    const inputStyles = `w-full text-2xl row-span-1 uppercase col-start-1 px-2  col-span-2 font-semibold   rounded-sm `
  return (
    <section className="w-screen h-screen flex bg-primary-2 ">
        {/* Address section */}
       <section className='w-full flex-1 p-10 bg-gray-900 flex justify-center items-center'>
           
          <form action="" className="w-[80%] h-[80%] p-6 shadow bg-white grid grid-cols-2  grid-rows-7 gap-2 rounded">
         <h1 className="text-xl  uppercase tracking-wide text-gray-  flex items-center ">ADRESS</h1>
            <input type="text" placeholder='FIRST NAME' className={`${inputStyles} w-full col-start-1 col-end-1 `}/>
            <input type="text" placeholder='LAST NAME' className={`${inputStyles} w-full col-start-2 col-end-2`}/>
            <input type="number" placeholder='PHONE NUMBER' className={inputStyles}/>
            <input type="text" placeholder='CITY' className={inputStyles}/>
            <input type="text" placeholder='LAND MARK' className={inputStyles}/>
            <input type="text" placeholder='PINCODE' className={inputStyles}/>

            <button className=" col-start-1 col-span-2 md:col-span-2    bg-primary-1 text-white font-semibold rounded-sm  transition">
          Save Address
            </button>
          </form>
        </section> 

        {/* Order detail section */}
        <section className="w-full flex-1  bg-primary-2 flex flex-col justify-center items-center m-12 rounded shadow">
          {/* product card*/}
          <div className="grid grid-cols-7  rounded-xs mt-10 mx-auto    gap-2 p-4">
          
             <img src={currentVarient.images[0]} alt="" className="rounded-xs object-cover object-center col-start-1 col-span-2 w-26 h-26 row-span-1 border"/>
             <div className="w-full col-start-3 col-span-full row-span-1 ">
              <h2 className="w-full text-2xl font-bold text-gray-700 tracking-wide capitalize font-serif">{product.title}</h2>
              <p className="flex gap-4 text-gray-700 py-3">

               { currentSize && <span>SIZE <span className="bg-gray-300 rounded-xs text-lg font-semibold h-6 w-6 inline-flex translate-0.5 justify-center items-center text-gray-900 font-serif">{currentSize?.size}</span></span> }

                <span>QUANTITY
                <span><input type="number"
                value={quantity}
                min={1}
                onChange={(e)=>dispatch(updateQuantity(e.target.value))}
                className=" border-b-2 text-gray-900 border-gray-400 w-10 h-6 pl-1 ml-1 font-semibold font-mono"/>
                </span>
                </span>

                <span className=" rounded-xs  ">
                PRICE__
                <span className="font-semibold text-gray-900 font-serif pl-1">
                  rs {price}.
                </span>
               </span>
               
               </p>
             </div>
             <p className="w-full col-start-1 col-span-full text-gray-600 tracking-tight text-md font-normal">{product.description}</p>
          </div>

{/* Total subTotal */}
         <div  className='m-auto flex w-full flex-col pr-10 items-end'>
          <div>
          <div className="w-full flex-1 text-lg font- flex items-end  flex-col gap-2 text-gray-800 font-serif">
            <h1>Subtotal__________ .<span className='font-serif inline-block min-w-20 bg-gray-100 text-end '>{price * quantity}</span></h1>
            <h2>Shipping__________.<span className='font-serif inline-block min-w-20 bg-gray-100 text-end'>{shippingFee}</span></h2>

            <h3 className="text-xl font-bold text-black ">Total_________ .<span className='font-serif inline-block min-w-20 bg-gray-100 text-end '>rs {shippingFee + (price * quantity)}</span>
            </h3>

          </div>

          {/* payment mode */}
          <div>
            
            
             <label htmlFor="COD" className={`flex mt-4 items-center text-sm tracking-wide font-medium text-gray-700 font-serif gap-1  ${isCOD ? "opacity-100" : "opacity-50"}`}>
              <input disabled={!isCOD} type="checkbox" id="COD" 
              className="translate-y-[1px]"/>
              Cash on delivery {!isCOD && <span>is not available</span>} </label>
           
            
        
          </div>
          <button className="py-2 text-xl font-medium bg-primary-1 w-full text-center  text-white flex-1 rounded-sm mt-3 cursor-pointer duration-100 hover:opacity-80">
            Place Order
          </button>
          </div>

          </div>
       
        </section>
        
    </section>
  )
}

export default PlaceOrder
