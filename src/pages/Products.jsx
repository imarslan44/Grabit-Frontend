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
    <section id="produts-section" className="w-screen min-h-screen  bg-primary-2 py-3  pt-10 h-auto bg-white-p/96 px-16">
      <h1 className="text-center text-3xl text-black-p font-bold py-4 font-Anton uppercase">Our Products</h1>
      <div className='w-full flex flex-wrap  justify-around'>

     {
      items.length > 0 ? items.map((item, index)=>(
        <Card key={index} index={index} item={item} styles="shadow-xl shadow-secondary-gray-100"/>
      )) :
         <h1 className="text-xl text-center font-bold  leading-5 w-full h-[70vh] flex justify-center items-center flex-col text-secondary-2/70 transition-opacity duration-1000 opacity-100">Something went wrong!  <br/> pleas check your internet first!.</h1>
       
     }
      </div>

    </section>
  )
}

export default Products