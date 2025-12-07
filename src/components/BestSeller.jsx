import React from 'react'
import { products } from '../assets/assets'
import Card from './Card'
const BestSeller = () => {

const bestSeller = products.filter((item)=>item.bestSeller)

  return (
    <section id="Best-seller" className="w-screen px-18 border mt-80 ">
        <h1 className="text-center text-3xl text-white-p font-bold py-4 font-Anton">Best Seller</h1>
        <div className=" w-full   flex justify-around items-center">
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