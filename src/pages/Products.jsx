// src/pages/Products.jsx
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useDispatch } from 'react-redux'
import { BACKEND_URL } from '../config/env.js'
import { LoadProducts } from '../context/productsSlice.js'

const Products = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const controller = new AbortController()
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = `${BACKEND_URL}/api/product`
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error(`Server responded ${res.status}`)
        const data = await res.json()
        const list = data?.data || []
        setItems(list)
        dispatch(LoadProducts(list)) // dispatch after we have the data
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err)
          setError('Failed to load products. Check your connection.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [dispatch])

  return (
    <section id="products-section" className="w-screen bg-white min-h-screen bg-white-p/96 px-6 md:px-16 py-8">
      

      {loading ? (
        <div className="w-full grid place-items-center py-24">
          <div className="text-gray-500">Loading products…</div>
        </div>
      ) : error ? (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <h2 className="text-xl text-center font-bold text-secondary-2/70">
            Something went wrong! <br /> Please check your internet and try again.
          </h2>
        </div>
      ) : (
        <div className="w-full px-4 md:px-8 lg:px-12 py-8">
  <h1 className="text-3xl font-bold mb-6">Our Products</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 products-grid">
    {items.map((item, index) => (
      <div
        key={item._id || index}
        className="product-cell transform transition duration-300"
      >
        <Card index={index} item={item} styles="hover:shadow-xl  shadow-secondary-gray-100 hover:border-gray-200" />
      </div>
    ))}
  </div>
</div>

      )}
    </section>
  )
}

export default Products
