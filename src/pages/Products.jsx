import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useSelector, useDispatch} from 'react-redux'

import {ProductList} from "../assets/assets.js"
import { LoadProducts } from '../context/productsSlice.js'

const Products = () => {
  const [items, setitems] = useState([]);

  const {products, loading, error} = useSelector((state)=> state.products);
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(LoadProducts(ProductList))
    
  }, [dispatch]);


  useEffect(() => {
    setitems(products)

  }, [products]);
  
  
  return (
    <section id="produts-section" className="w-screen bg-primary-2 py-3   h-auto bg-white-p/96 px-16">
      <h1 className="text-center text-3xl text-black-p font-bold py-4 font-Anton uppercase">Our Products</h1>
      <div className='w-full flex flex-wrap  justify-around'>

     {
      items.map((item, index)=>(
        <Card key={index} index={index} item={item} styles="shadow-xl shadow-secondary-gray-100"/>
      ))
     }
      </div>

    </section>
  )
}

export default Products