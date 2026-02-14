import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProduct, updateQuantity, updateAddress } from '../context/order.slice'
import { fetchProductdetail } from '../controllers/product.controller.js'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { placeOrderCOD, handlePayment} from '../controllers/order.controller.js'

const PlaceOrder = () => {
  
  const [address, setAddress] = useState({
    firstName: "",
    lastName:"",
    phone: "",
    city: "",
    street: "",
    landMark: "",
    pinCode: "",
    saveAddress: false,
  })

  const [savedAddress, setSavedAddress] = useState({
    firstName: "",
    lastName:"",
    phone: "",
    city: "",
    street: "",
    landMark: "",
    pinCode: "",
    saveAddress: false,
  })
  const [showAddressFOrm, setShowAddressFOrm] = useState(false)

  const {product, productId, variantIndex, sizeIndex, quantity} = useSelector((state)=>state.order);
  const dispatch = useDispatch()

  
  const currentVarient = product?.variants[variantIndex];
  const currentSize = currentVarient?.sizes?.[sizeIndex];
  
  const price = currentSize?.price || currentVarient?.price
  

  const shippingFee = 30;
  
  const isCOD = product?.delivery?.COD || false
  const [CODSelected, setCODSelected] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams();

  useEffect(() => {
    if(product) return
  (async () =>{
  const productDetail = await fetchProductdetail(id);
  const payload = {
      product: productDetail,
      productId: id,
      variantIndex : variantIndex || 0,
      sizeIndex : sizeIndex || 0,
    }

  dispatch(updateProduct(payload))
  })()
  },[id]);
  
  
 

  // handle Address Change
  const handleAddress = (e)=>{
    const {name, value} = e.target;

    setAddress((pre)=>{
      return {...pre, [name]: value}
    })
  }


  const handleOrder = async ()=>{
     const orderData = {
        productId,
        variantIndex,
        quantity,
        sizeIndex,
        savedAddress,
        shipping: shippingFee,
        ammount : (quantity * price) + shippingFee,
      };
  
  // validate the address in two steps
  const inValidAddress = !savedAddress.firstName || !savedAddress.lastName || !savedAddress.city || !savedAddress.pinCode || !savedAddress.pinCode || !savedAddress.street || !savedAddress.landMark || false;
  if(inValidAddress) return alert("pleas enter address before");


   if(!isCOD) {
    handlePayment(orderData)

   }else{
    placeOrderCOD(orderData)
   }
  }

  const saveAdressFunc = (e)=>{
    e.preventDefault()
    let copyAddresState = {...address};
    setSavedAddress(copyAddresState);
    setShowAddressFOrm(false)

  }

  


    const inputStyles = `w-full text-2xl row-span-1 uppercase col-start-1 px-2  col-span-2 font-semibold   rounded-sm `

  return (
    <section className="w-screen lg:h-screen flex flex-col lg:flex-row  bg-primary-2  relative pt-15  justify-center ">
      {/* Back btn */}

   <button onClick={()=>navigate(`/product/${productId}`)}
       className="p-3  absolute top-18 left-10  rounded text-black text-xl cursor-pointer  z-91">
        <ion-icon name="arrow-back-sharp"></ion-icon>
      </button>
    
        {/* Address section */}
        { showAddressFOrm &&
       <section className={` max-sm:absolute max-sm:h-screen w-screen flex-1 md:p-10 bg-amber-50 flex justify-center items-center relative border-r-1 border-gray-300 top-0  transition-all duration-800 left-0 z-90  ${showAddressFOrm ? "left-0" : "-left-full" }`}>

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
}

        {/* Order detail section */}
        <section className=" w-full md:w-1/2 bg-amber-50  max-md:h-screen h-full  flex flex-col justify-center items-center p-4 mb-2 rounded border-x border-gray-200">
          {/* product card*/}
          <div className="grid grid-cols-7  w-full   mt-10 mx-auto    gap-1 p-4 border-b border-gray-100">
          
             <img src={currentVarient?.images[0]} alt="" className="rounded-xs object-cover object-center col-start-1 col-span-2 w-26 h-26 row-span-1 border"/>
             <div className="w-full col-start-3 col-span-full row-span-1 ">

              <h2 className="w-full text-xl  text-gray-700 tracking-tight capitalize font-serif">{product?.title}</h2>

              <p className="flex gap-4 text-gray-700 py-3 border-b">

               { currentSize && <span>SIZE <span className="bg-gray-300 rounded-xs text-lg font-semibold h-6 w-6 inline-flex translate-0.5 justify-center items-center text-gray-900 font-serif">{currentSize?.size}</span></span> }

                <span>QUANTITY :
                <span><input type="number"
                value={quantity}
                min={1}
                onChange={(e)=>dispatch(updateQuantity(e.target.value))}
                className=" border-b-2 text-gray-900 border-gray-400 w-10 h-6 pl-1 ml-1 font-semibold font-mono"/>
                </span>
                </span>

                <span className=" rounded-xs  ">
                PRICE :
                <span className="font-semibold text-gray-900 font-serif pl-1">
                  rs {price}.
                </span>
               </span>
               
               </p>
             </div>
             <div className="w-full col-start-1 col-span-full font-semibold relative pt-2">

              <button onClick={()=>setShowAddressFOrm(true)}
              className="text-blue-800 absolute top-2 right-3 cursor-pointer">{
               savedAddress.firstName ? <>
               <ion-icon name="create-outline"></ion-icon> Edit </> : <>
              <ion-icon className="font-bold translate-1 text-xl" name="add-outline"></ion-icon> Add 
              </>
                  }
              </button>

              <h2>Order Address</h2>
             <div className="w-full col-start-1 col-span-full text-gray-600 tracking-tight text-md font-normal  text-start justify-baseline gap-1 ">

            { savedAddress.firstName ? <>
               <span>{savedAddress.firstName  + " " + savedAddress.lastName }, </span>
               {savedAddress.phone },  {savedAddress.city}, {savedAddress.street}, <br /> {savedAddress.landMark},<span>{savedAddress.pinCode}.</span>
               </> : <><h2>Please ennter an address</h2></>
              }

             </div>
             </div>
          </div>

{/* Total subTotal */}
         <div  className='m-auto flex w-full flex-col  items-end px-6'>
        
          <div className="w-full flex-1 text-lg font- flex items-end  flex-col gap-2 text-gray-800 font-serif">
            <h1 className="flex justify-between w-full">Subtotal__________ .<span className='font-serif inline-block min-w-20 bg-gray-100 text-start '>Rs {price * quantity}</span></h1>
            <h2 className="flex justify-between w-full">Shipping__________.<span className='font-serif inline-block min-w-20 bg-gray-100 text-start'>Rs {shippingFee}</span></h2>

            <h3 className="flex justify-between w-full">Total____________.<span className='font-serif inline-block min-w-20 bg-gray-100 text-start '>Rs {shippingFee + (price * quantity)}</span>
            </h3>

       

          {/* payment mode */}
          <div>
            
            
             <label htmlFor="COD" className={`flex mt-4 items-center text-sm tracking-wide font-medium text-gray-700 font-serif gap-1  ${isCOD ? "opacity-100" : "opacity-50"}`}>
              <input disabled={!isCOD} type="checkbox" id="COD" 
              className="translate-y-[1px]"/>
              Cash on delivery {!isCOD && <span>is not available</span>} </label>
           
            
        
          </div>
          <button onClick={handleOrder}
           className="py-2 text-xl font-medium bg-primary-1 w-full text-center  text-white flex-1 rounded-sm mt-3 cursor-pointer duration-100 hover:bg-gray-800">
            Place Order
          </button>
          </div>

          </div>
       
        </section>
        
    </section>
  )
}

export default PlaceOrder
