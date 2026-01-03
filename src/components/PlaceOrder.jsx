import React, {useState, useEffect} from 'react'
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
  const {product, productId, variantIndex, sizeIndex, quantity} = useSelector((state)=>state.order);
  const dispatch = useDispatch()

  
  const currentVarient = product?.variants[variantIndex];
  const currentSize = currentVarient?.sizes?.[sizeIndex];
  
  const price = currentSize?.price || currentVarient?.price
  

  const shippingFee = 30
  const isCOD = product?.COD || false

  const navigate = useNavigate()
  const {id} = useParams();

  useEffect(() => {
    if(product) return
  (async () =>{
    console.log("running async fetch")
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
        address,
        shipping: shippingFee,
        ammount : (quantity * price) + shippingFee,
      };
  
  // validate the address in two steps
  const inValidAddress = !address.firstName || !address.lastName || !address.city || !address.pinCode || !address.pinCode || !address.street || !address.landMark || false;
  if(inValidAddress) return alert("pleas enter address before");


   if(!isCOD) {
    handlePayment(orderData)

   }else{
    placeOrderCOD(orderData)
   }
  }

  


    const inputStyles = `w-full text-2xl row-span-1 uppercase col-start-1 px-2  col-span-2 font-semibold   rounded-sm `

  return (
    <section className="w-screen h-screen flex bg-primary-2  relative">
        {/* Address section */}
       <section className='w-full flex-1 p-10 bg-gray-900 flex justify-center items-center'>

        <button 
        onClick={()=>navigate(`/product/${productId}`)}
        className=" rounded-xs shadow text-2xl  absolute top-10 left-10 text-gray-200 hover:text-white cursor-pointer"><ion-icon name="arrow-back-outline"></ion-icon>
        </button>
           
          <form action="" className="w-[80%] h-[80%] p-6 shadow bg-white grid grid-cols-2  grid-rows-7 gap-2 rounded">
         <h1 className="text-xl  uppercase tracking-wide text-gray-  flex items-center  ">ADRESS</h1>

            <input
            onChange={handleAddress} value={address.firstName}
             type="text" name="firstName" placeholder='FIRST NAME' 
             className={`${inputStyles} w-full col-start-1 col-end-1 `}/>

            <input 
            onChange={handleAddress} value={address.lastName}
            type="text" name="lastName" placeholder='LAST NAME' 
            className={`${inputStyles} w-full col-start-2 col-end-2`}/>

            <input onChange={handleAddress} value={address.phone}
            type="number" name="phone" placeholder='PHONE NUMBER' 
            className={inputStyles}/>

            <input onChange={handleAddress} value={address.city}
            type="text" name="city" placeholder='CITY' 
            className={`${inputStyles} w-full col-start-1 col-end-1 `}/>

            <input onChange={handleAddress} value={address.pinCode}
            type="number" name="pinCode" placeholder='PINCODE' 
            className={`${inputStyles} w-full col-start-2 col-end-2 `}/>

            <input onChange={handleAddress} value={address.street}
            type="text" name="street" placeholder="STREET" 
            className={inputStyles}/>

            <input onChange={handleAddress} value={address.landMark}
            type="text" name="landMark" placeholder='LAND MARK' 
            className={inputStyles}/>
         

            <button type="button"
             className=" col-start-1 col-span-2 md:col-span-2    bg-gray-800 text-white font-semibold rounded-sm  transition cursor-pointer">
              Save Address
            </button>
          </form>
        </section> 

        {/* Order detail section */}
        <section className="w-full flex-1  bg-primary-2 flex flex-col justify-center items-center m-12 rounded shadow">
          {/* product card*/}
          <div className="grid grid-cols-7  rounded-xs mt-10 mx-auto    gap-2 p-4">
          
             <img src={currentVarient?.images[0]} alt="" className="rounded-xs object-cover object-center col-start-1 col-span-2 w-26 h-26 row-span-1 border"/>
             <div className="w-full col-start-3 col-span-full row-span-1 ">
              <h2 className="w-full text-2xl font-bold text-gray-700 tracking-wide capitalize font-serif">{product?.title}</h2>
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
             <p className="w-full col-start-1 col-span-full text-gray-600 tracking-tight text-md font-normal">{product?.description}</p>
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
