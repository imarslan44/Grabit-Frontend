import React, { useEffect, useState } from 'react'
import { products } from '../assets/assets'
import Card from '../components/Card'
const Products = () => {
  const [items, setitems] = useState([]);

  useEffect(() => {
    setitems(products);

  }, [products])
  
  return (
    <section id="produts-section" className="w-screen  px-18  h-screen">
      <h1 className="text-center text-3xl text-white-p font-bold py-4 font-Anton ">Our Products</h1>
      <div className='w-full flex flex-wrap  justify-around'>

     {
      items.map((item, index)=>(
        <Card index={index} item={item}/>
      ))
     }
      </div>

    </section>
  )
}

export default Products