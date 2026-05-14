import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProduct, updateQuantity, updateAddress } from '../context/order.slice'
import { fetchProductdetail } from '../controllers/product.controller.js'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { placeOrderCOD, handlePayment} from '../controllers/order.controller.js'
import AddressFrom from '../components/AddressFrom.jsx'

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

const handleOrder = async ()=>{
     const orderData = {
        productId,
        variantIndex,
        quantity,
        sizeIndex,
        address: savedAddress,
        shipping: shippingFee,
        amount : (quantity * price) + shippingFee,
      };
  
  // validate the address in two steps
  const inValidAddress = !savedAddress.firstName || !savedAddress.lastName || !savedAddress.city || !savedAddress.pinCode || !savedAddress.pinCode || !savedAddress.street || !savedAddress.landMark || false;

  if(inValidAddress) return alert("pleas enter address before");

   if(!CODSelected) {
    handlePayment(orderData)

   }else{
    placeOrderCOD(orderData)
   }
  }


  return (
    <section className="w-screen  h-screen flex flex-col lg:flex-row  bg-primary-2  relative pt-15  justify-center ">
      {/* Back btn */}

      <button onClick={()=>navigate(`/product/${productId}`)}
       className="p-3  absolute top-16 left-2  sm:left-6  rounded text-gray-600 text-2xl cursor-pointer  z-90">
        <ion-icon name="arrow-back-sharp"></ion-icon>
      </button>
    
        {/* Address section */}
        { showAddressFOrm &&  <AddressFrom 
                              showAddressFOrm={showAddressFOrm}
                              setShowAddressFOrm={setShowAddressFOrm}
                              address={address}
                              setAddress={setAddress}
                              setSavedAddress={setSavedAddress}
                             />
        }

        {/* Order detail section */}
        <section className=" w-full md:w-1/2 bg-gray-50  max-md:h-screen h-full  flex flex-col justify-center items-center p-2 mb-2 rounded border-x border-gray-200">
              {/* product card*/}
          <div className="grid grid-cols-7  w-full   mt-10 mx-auto    gap-3  border-b border-gray-100 bg-black rounded-lg p-3">
          
            <img src={currentVarient?.images[0]} alt="" className="rounded-sm translate-y-2  object-contain col-start-1 col-span-2 w-28 h-28 row-span-1 border border-gray-200 bg-white"/>
            <div className="w-full col-start-3 col-span-full row-span-1 ">

              <h2 className="w-full   text-gray-200 tracking-tight leading-6 text-lg font-semibold">{product?.title}</h2>
              <p className="flex gap-3 text-gray-700 py-3 border-b">

                { 
                currentSize && <span>SIZE <span className="bg-gray-300 rounded-xs text-lg font-semibold h-6 w-6 inline-flex translate-0.5 justify-center items-center text-gray-900 font-serif">{currentSize?.size}</span></span> 
                }

                <span className="text-gray-200  p-2 bg-gray-800 font-semibold">QUANTITY :
                 <span><input type="number"
                 value={quantity}
                 min={1}
                 onChange={(e)=>dispatch(updateQuantity(e.target.value))}
                 className=" border-b-2  border-gray-400 w-10 h-6  text-white rounded   pl-1 ml-1 font-semibold font-mono"/>
                 </span>
                 </span>

                 <span className=" rounded-xs font-semibold text-gray-200  p-2 bg-gray-800">
                  PRICE :
                  <span className="font-semibold  bg-orange-600 px-2 py-1 rounded pl-1 text-white">₹{price}.
                  </span>
                </span>
              </p>
            </div>
            <div className="w-full col-start-1 col-span-full font-semibold relative pt-2">

              <button onClick={()=>setShowAddressFOrm(true)}
              className="text-orange-600 absolute top-2 right-3 cursor-pointer">{
               savedAddress.firstName ? <>
               <ion-icon name="create-outline"></ion-icon> Edit </> : <>
              <ion-icon className="font-bold translate-1 text-xl" name="add-outline"></ion-icon> Add 
              </>
                  }
              </button>

              <h2 className='text-gray-400'>Order Address</h2>
             <div className="w-full col-start-1 col-span-full text-gray-200 tracking-tight text-md font-normal  text-start justify-baseline gap-1 ">

            { 
               savedAddress.firstName ? <>
               <span>{savedAddress.firstName  + " " + savedAddress.lastName }, </span>
               {savedAddress.phone },  {savedAddress.city}, {savedAddress.street}, <br /> {savedAddress.landMark},<span>{savedAddress.pinCode}.</span>
               </> : <><h2>Please ennter an address</h2></>
              }
             </div>
             </div>
          </div>

  {/* Total subTotal */}
         <div  className='m-auto flex w-full flex-col  items-end px-4 sm:px-6'>
        
          <div className="w-full flex-1 text-lg font- flex items-end  flex-col gap-2 text-gray-800 font-serif">
            <h1 className="flex justify-between w-full border-b border-gray-300">Subtotal.<span className='font-serif inline-block min-w-20 text-end '>Rs {price * quantity}</span></h1>
            <h2 className="flex justify-between w-full border-b border-gray-300">Shipping.<span className='font-serif inline-block min-w-20  text-end'>Rs {shippingFee}</span></h2>
            <h3 className="flex justify-between w-full border-b border-gray-300">Total.<span className='font-serif inline-block min-w-20  text-end '>Rs {shippingFee + (price * quantity)}</span>
            </h3>

          {/* payment mode */}
          <div className="w-full">
               
             <label htmlFor="COD" className={`flex mt-4   w-full items-center text-md tracking-wide font-medium text-gray-700 font-serif gap-1  ${isCOD ? "opacity-100" : "opacity-50"}`}>
              <input disabled={!isCOD}
              onChange={(e)=>setCODSelected(e.target.checked)} 
              type="checkbox" id="COD" 
              className="translate-y-[1px] scale-150"/>
              Cash on delivery {!isCOD && <span>is not available</span>} </label>
           
          </div>
          <button onClick={handleOrder}

           className="py-3 text-xl font-medium bg-black w-full text-center  text-white flex-1 rounded-sm mt-3 cursor-pointer duration-100 hover:bg-gray-800">
            Place Order
          </button>
          </div>
          </div>
        </section> 
    </section>
  )
}

export default PlaceOrder
