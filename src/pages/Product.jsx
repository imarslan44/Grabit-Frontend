import React, { useEffect, useState } from 'react'
import { getProdctDetails } from '../controllers/product.controller';
import { useParams } from 'react-router-dom';


const Product = () => {
const [Product, setProduct] = useState(null);
const {id} = useParams();
const [SelectedImage, setSelectedImage] = useState();
const ProductData = getProdctDetails(id)

const [quantity, setQuantity] = useState(1);


useEffect(() => {
setProduct(ProductData)
 setSelectedImage(()=>
ProductData?.images[0]);

}, [ProductData])





  return (
    // product detail section
    <section id='product-detail' className="w-screen   min-h-screen md:h-screen">
      {/* images box */}
      <div id="image-wraper" className="w-full flex flex-col h-full   bg-primary-2 max-md:h-auto md:flex-row-reverse md:p-10 p-4 pt-10 md:pt-16 ">
      
    {/* selected image to show*/}
    <div className="  h-full w-2/5    max-md:w-10/11 p-2">
      <img src={SelectedImage} alt="" className=" h-full  rounded-sm"/>

    </div>

    {/* image-select-wraper */}
      
<div className="  flex gap-3 h-full md:flex-col p-6 ">
    {
      Product && (   Product?.images?.map((img, index)=>(
          
       <div key={index} className={`bg-white-p border-2 rounded-sm w-20 h-20 overflow-hidden cursor-pointer ${SelectedImage === img? "border-lite-1": "border-secondary-2"} `} onClick={()=>setSelectedImage(img)} >
        <img src={img} alt="" className='h-full w-full object-contain object-center' />
        
       </div>
         ))
    )
    }
</div>

    {/* text box */}
  <div className="w-full flex-1  flex flex-col p-4">
    <h2 className="font-bold text-xl text-gray-s">{Product?.name}</h2>
    <p className="text-secondary-2 tracking-wide text-sm py-3">{Product?.description}</p>
    {/* properties of product */}
    <ul className='text-sm  py-3'>
      <h2 className="text-lg text-secondary-1 font-bold">Properties</h2>
      <li className="text-secondary-2">100+ pages</li>
      <li className="text-secondary-2">Solid Cover</li>
    </ul>

{/*price & quantity */}
<div className="flex w-3/4 justify-between py-3">
  <p className="flex gap-1 items-baseline">
    <span className="text-green-500">{Product?.discount}%</span>
    <span className="text-gray-500 text-xs line-through">{"Rs1200"}</span> 
    <span>Rs{Product?.price}</span>
  </p>
  <div className="flex items-baseline">
    <label htmlFor="price" className="text-gray-600">QUANTITY:</label>
    <input id="price" className="w-10 h-5 p-1 ouline-1 outline-gray-600 border rounded-xs border-gray-400 " type="number" min={1} value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
  </div>
</div>
{/* buttons */}
   <div className="flex justify-between gap-6  static bottom-4">
     <button className="w-full flex-1 border rounded-sm border-gray-s cursor-pointer hover:bg-primary-1 hover:text-primary-2 hover:scale-110 p-3 text-sm duration-200">Add To Cart</button>
     <button className="w-full flex-1  rounded-sm border-primary-1 bg-primary-1 text-primary-2 cursor-pointer border  hover:scale-110  p-3 text-sm duration-200">Place Order</button>
   </div>
</div>

</div>
</section>
  )
}

export default Product