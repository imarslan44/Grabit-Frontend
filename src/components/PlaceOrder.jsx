import React from 'react'

const PlaceOrder = () => {


    const inputStyles = `w-full text-xl row-span-1 uppercase col-start-1 px-2 py-3 col-span-2  rounded-sm `
  return (
    <section className="w-screen h-screen flex bg-primary-2 ">
        {/* Address section */}
       <section className='w-full flex-1 p-10 bg-gray-700 flex justify-center items-center'>
          <form action="" className="w-[80%] h-[80%] p-6 shadow bg-white grid grid-cols-2  grid-rows-6 gap-2">
            <input type="text" placeholder='FIRST NAME' className={`${inputStyles} w-full col-start-1 col-end-1 `}/>
            <input type="text" placeholder='LAST NAME' className={`${inputStyles} w-full col-start-2 col-end-2`}/>
            <input type="text" placeholder='PHONE NUMBER' className={inputStyles}/>
            <input type="text" placeholder='CITY' className={inputStyles}/>
            <input type="text" placeholder='LAND MARK' className={inputStyles}/>
            <input type="text" placeholder='PINCODE' className={inputStyles}/>
            <button className=" col-start-1 col-span-2 md:col-span-2 mt-4 py-2 bg-primary-1 text-white font-semibold rounded-sm  transition">
          Save Address
            </button>
          </form>
        </section> 

        {/* Order detail section */}
        <section className="w-full flex-1 h-screen">

        </section>
        
    </section>
  )
}

export default PlaceOrder