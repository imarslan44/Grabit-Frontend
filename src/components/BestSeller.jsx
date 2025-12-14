import React from 'react'
import { ProductList } from '../assets/assets'
import Card from './Card'
const BestSeller = () => {
  
const bestSeller = ProductList.filter((item)=>item.bestSeller)

  return (
    <section id="Best-seller" className="w-screen px-20   bg-lite-1 max-md:px-10 border py-3">

        <h1 className="  text-3xl text-primary-2 font-bold  font-Anton uppercase">Best Seller</h1>
        <div className=" w-full gap-3  flex justify-around items-center flex-wrap max-md:justify-center  bg-white ">
            {
               bestSeller.map((item, index)=>(
               <Card key={index} index={index} item={item}/>
               )) 
            }
        </div>



    </section>

  )
}

export default BestSeller