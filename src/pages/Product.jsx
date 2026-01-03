import React, { useEffect, useState } from 'react'
import {fetchProductdetail } from '../controllers/product.controller.js';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../controllers/cart.controller.js';
import { useDispatch } from 'react-redux';
import { updateProduct, updateQuantity } from '../context/order.slice.js';




const Product = () => {

const {id} = useParams();
const [Product, setProduct] = useState(null);

//currect varient and images to show
//const [currentVariant, setCurrentVariant] = useState(null)
//const [currentSize, setCurrentSize] = useState(null);

const [sizeIndex, setSizeIndex] = useState(0)
const [variantIndex, setVarientIndex] = useState(0);

const [SelectedImage, setSelectedImage] = useState(null);
const [quantity, setQuantity] = useState(1);

const currentVariant = Product?.variants?.[variantIndex]
const currentSize = currentVariant?.sizes?.[sizeIndex]

const price = currentSize?.price || currentVariant?.price;

//dispatch function for orderSilce
const dispatch = useDispatch();

const navigate = useNavigate()




useEffect(() => {

(async () =>{
const productDetail = await fetchProductdetail(id);
 setProduct(productDetail);
})()

},[id]);





const handleCart = async ()=>{
  try{
    const cartData = {productId : id, quantity, variantIndex, currentSize}
  const {status, data} = await addToCart(cartData);
 
  if(status === 401) return alert("you need to login beroe add to cart");
  alert(data.message || "something went wrong")
  }catch(error){
    
     console.log(error);
    }
};




 const updateOrderData = ()=>{
    if(!Product || !id ) return 
    if(!quantity) return alert("pleas ender quantity first");

    const payload = {
      product: Product,
      productId: id,
      variantIndex,
      sizeIndex,
    }

    dispatch(updateProduct(payload));
    dispatch(updateQuantity(quantity));

    navigate(`/order/place/${id}`)
    
  }


useEffect(() => {
  
 const firstImage = currentVariant?.images[0]
    setSelectedImage(firstImage);
}, [currentVariant]);





  return (
    // product detail section
    <section id='product-detail' className="w-screen  pt-14 pb-4  bg-primary-2 h-screen flex flex-col md:flex-row overflow-y-auto gap-1 md:gap-5">


{/* image section */}
<div className='w-full max-md:h-[70vh] md:h-full pr-1 flex-1'>

  <div className="w-full  h-full  grid-cols-5 grid grid-rows-8 gap-y-2  md:gap-y-4 md:gap-x-2  pl-1">

    
     {/* select image to show */}
      <div className="flex flex-col col-start-1 col-span-full md:col-span-1 md:row-start-1 row-start-6 row-span-2 md:row-span-7 rounded-xs bg-gray-100 ">

       {

        currentVariant && currentVariant.images.map((image, index)=>(
          <button className="w-1/3 md:w-full h-full  md:h-1/4" key={index} onClick={()=>setSelectedImage(image)}>

            <img  src={image} alt="" className="w-full h-full rounded-xs object-cover object-center"/>

          </button>
          
        ))
       }
       </div>
    

     {/* large image */}
      <div className=" bg-gray-100  rounded-sm overflow-hidden flex-2  col-start-1 col-span-full md:col-start-2 md:col-span-4  row-start-1 row-span-5 md:row-span-7">
        <img src={SelectedImage} alt=""  className="w-full h-full object-cover object-center"/>
      </div>
   

   


{/* Buy now & Add to cart button */}
    <div className=" col-start-1 col-span-full flex justify-between gap-6 flex-1 w-full static bottom-4 row-start-8 row-span-1  ">
     <button 
     onClick={handleCart}
     className="w-full flex-1 border rounded-sm border-gray-200 shadow bg-gray-100 font-semibold cursor-pointer hover:bg-primary-1 hover:text-primary-2 hover:scale-110 p-3 text-sm duration-200">Add To Cart</button>
     <button
     onClick={updateOrderData}
      className="w-full flex-1 font-semibold rounded-sm border-primary-1 bg-primary-1 text-primary-2 cursor-pointer border  hover:scale-110  p-3 text-sm duration-200">BUY NOW</button>
   </div>

</div>
 </div>

  {/* full  text detail of product of other select options */}
<div className="flex flex-col  flex-1 w-[40%] bg-gray-100 rounded  p-3 ">
    <h2 className="text-lg font-semibold text-secondary-2/60 tracking-tight uppercase">{"Seller"}</h2>
    <h1 className="font-bold text-2xl tracking-wide pl-3 capitalize">{Product?.title}</h1>
    <p className=""><span className="text-green-500 text-sm">{Product?.discount == true && `${Product.discount}%`}</span> <span className="text-xl font-bold font-serif"> <span className="text-gray-700">rs</span> { quantity * price}</span></p>

    {/* select color */}
    <div className="flex max-md:flex-col py-3 gap-2">
      <h3 className=" w-1/6 text-md text-secondary-2/50 font-semibold tracking-tight">COLOR</h3>
      <div className="flex gap-2 ">
      {
        Product &&   Product.variants.map((variant, index)=>(


          
          
              <button key={index} 
              onClick={()=>{
                
                setVarientIndex(index);
              
              }
                } 
                className="">
             
              <img src={variant.images?.[0]} alt=" variant tumbnail"
               className={`border-2   h-24 w-26 rounded-xs onject-center object-cover cursor-pointer ${currentVariant?.color === variant.color ? "opacity-70": "border-white"}`}/>

                <p className=" text-md font-semibold text-secondary-2/70 text-start">{variant.color}</p>

      
            </button>
      
        ))
      }
    </div>

</div>


{
  //select-size
  
currentVariant?.sizes.length > 0 && <div className="flex py-2">
  <h3 className=" w-1/6 text-xl max-sm:flex-col text-secondary-2/50 font-semi-bold tracking-tight">SIZE</h3>
  <div className="flex gap-2">
      {
        currentVariant?.sizes?.map((s, index)=>(

          <button key={index}

          onClick={()=>{setSizeIndex(index)}}

           className={` rounded-sm bg-gray-200/70 w-7 h-7 text-xl font-semibold border-2 font-serif border-gray-200/70 cursor-pointer ${currentSize.size === s.size ? "border-gray-600" : ""}`}>
            {s.size}
          </button>

        ))
      }
      </div>
   </div>
 }
 {/* set order quantity */}
 <div className="flex gap-2">
   <label className="text-md font-bold text-gray-600" htmlFor="quantity">QUANITY:</label>
   <input className="w-9 text-center h-6 font-mono border-2 border-gray-400 rounded" value={quantity} onChange={(e)=>setQuantity(e.target.value)} type="number" id="quantity" min={1} />
 </div>

{/* specs / highlights */}

 <div className="pt-2"> 
   <h3 className="text-md font-semibold text-secondary-2/60">
   Highlights</h3>
   <ul className="list-disc pl-6 "> 
    {Product && Product.attributes.specs.map((spec, index) => (
      spec && <li key={index}
       className='text-gray-600 leading-5 tracking-wide'>{spec}</li> 
      ))
       } 
   </ul> 
 </div>

{/* description */}
{
Product?.description && <div className="py-3">
  <h3 className="text-lg font-semibold text-secondary-2/60 ">Description</h3>
    <p className="text-secondary-2/60 pl-3">{Product?.description}</p>
</div>
}

 








      {/* 
  

 */}
</div>

   



</section>
  )
}

export default Product