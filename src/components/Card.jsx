// src/components/Card.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ styles = '', item }) => {

  const variant = item.variants?.[0]
  const image = variant?.images?.[0] || item.image || ''
  const price = variant?.price || variant?.sizes?.[0]?.price || item.price || '—'

  return (
    <article className={`bg-white border border-gray-100 hover:shadow max-w-70 relative rounded-xs overflow-hidden ${styles}`}>
      <Link to={`/product/${item._id}`} className="block">
        {/* image container keeps aspect ratio and uses object-cover */}
      
<div className="w-full overflow-hidden  p-2 ">
  <img
    src={image}
    alt={item.title || 'product'}
    loading="lazy"
    className="w-full h-full object-cover block aspect-[4/5] rounded-xs"
  />
</div>



<div className="h-[122%] w-full absolute -bottom-24 hover:-translate-y-24 duration-200 left-0">
        <div className=" p-2  max-h-1/2 bg-white absolute bottom-0   w-full ">
          
          <div className="mt-2   items-center h-13 ">
            <h3 className="text-md font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
            <p className="flex justify-between ">
            <span className="text-xs text-gray-500">Rs {price}</span>
            <span className="text-xs text-gray-400">{item.category || ''}</span>
            </p>
          </div>
          <div className="h-20">
          <p className="text-xs text-gray-700">{item.description}</p>
          </div>
        </div>
      </div>
      </Link>
    </article>
  )
}

export default Card
