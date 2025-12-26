import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useSelector, useDispatch} from 'react-redux'
import { BACKEND_URL } from '../config/env.js';
import { LoadProducts } from '../context/productsSlice.js'

const Products = () => {
  const [items, setitems] = useState([]);
  const [ProductList, setProductList] = useState([])
  const {products, loading, error} = useSelector((state)=> state.products);
  const dispatch = useDispatch();

  const fetchProducts = async (req , res) =>{
    const url = `${BACKEND_URL}/api/product`
    const response = await fetch(url)
    const data = await response.json();
    console.log(data.data); 
    setProductList(data.data)
    setitems(data.data)
  }


  useEffect(() => {
    fetchProducts();
    dispatch(LoadProducts(ProductList))
    
  },[]);


  useEffect(() => {
  console.log("itmes", items)

  }, [items]);
  
  
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