import React, {useState} from 'react'

const AddressFrom = ({showAddressFOrm, setShowAddressFOrm, address, setAddress, setSavedAddress}) => {

     

const handleAddress = (e)=>{
    const {name, value} = e.target;

    setAddress((pre)=>{
      return {...pre, [name]: value}
    })
  }

    
  const saveAdressFunc = (e)=>{
    e.preventDefault()
    let copyAddresState = {...address};
    setSavedAddress(copyAddresState);
    setShowAddressFOrm(false)

  }

    const inputStyles = `w-full text-2xl row-span-1 uppercase col-start-1 px-2  col-span-2 font-semibold   rounded-sm `

  return (
     <section className={` max-sm:absolute max-sm:h-screen w-screen flex-1 md:p-10 bg-white flex justify-center items-center relative border-r-1 border-gray-300 top-0  transition-all duration-800 left-0 z-90  ${showAddressFOrm ? "left-0" : "-left-full" }`}>
    
            <button onClick={()=>setShowAddressFOrm(false)}
             className="max-md:absolute  left p-1 px-2 text-black absolute max-sm:top-16 top-3 right-2 bg-white cursor-pointer rounded-sm hover:shadow border border-gray-200  ">
             Close 
            </button>
               
           <form onSubmit={saveAdressFunc} action="" className="w-full max-w-xl max-sm:h-4/7 h-full md:w-[80%] lg:h-[80%]   py-6 px-3 md:px-10  bg-white  shadow grid grid-cols-2  grid-rows-7 gap-2 lg:rounded ">
             <h1 className="text-2xl   tracking-wide text-gray-800  flex items-center font-semibold">ADRESS</h1>
    
                <input
                onChange={handleAddress} value={address.firstName}
                 type="text" name="firstName" placeholder='FIRST NAME' 
                 required
                 className={`${inputStyles} w-full col-start-1 col-end-1 `}/>
    
                <input 
                required
                onChange={handleAddress} value={address.lastName}
                type="text" name="lastName" placeholder='LAST NAME' 
                className={`${inputStyles} w-full col-start-2 col-end-2`}/>
    
                <input 
                required
                onChange={handleAddress} value={address.phone}
                type="number" name="phone" placeholder='PHONE NUMBER' 
                className={inputStyles}/>
    
                <input 
                required
                onChange={handleAddress} value={address.city}
                type="text" name="city" placeholder='CITY' 
                className={`${inputStyles} w-full col-start-1 col-end-1 `}/>
    
                <input 
                required
                onChange={handleAddress} value={address.pinCode}
                type="number" name="pinCode" placeholder='PINCODE' 
                className={`${inputStyles} w-full col-start-2 col-end-2 `}/>
    
                <input
                required
                 onChange={handleAddress} value={address.street}
                type="text" name="street" placeholder="STREET" 
                className={inputStyles}/>
    
                <input
                required
                 onChange={handleAddress} value={address.landMark}
                type="text" name="landMark" placeholder='LAND MARK' 
                className={inputStyles}/>
             
             <div className="w-full flex gap-3 col-start-1 col-span-full justify-between">
      
                <button type="button"
                 className="     border border-gray-800 text-gray-800  rounded-xs px-2  transition cursor-pointer">
                  Save as permanent Address
                </button>
                 <button
                  type="submit"
                 className="bg-gray-800 text-white  rounded-xs px-2  transition cursor-pointer">
                  Save Address
                </button>
            </div>
           </form>
    
    </section> 
  )
}

export default AddressFrom