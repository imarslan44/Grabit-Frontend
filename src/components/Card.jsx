import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({styles, item, index}) => {

const variant = item.variants?.[0];
const image = variant?.images?.[0];

const price = variant?.price || variant?.sizes?.[0]?.price;

  const classes = `w-50 h-62 overflow-hidden bg-primary-2/80 p-1 rounded-sm  hover:shadow-2xl shadow-gray-s/30  hover:-translate-y-2 duration-200  my-4  ${styles}`
  
  return (
    <Link to={`/product/${item._id}`} className={classes} key={index} id={item._id}>
                <img src={image} alt="" className="w-full h-6/7 rounded-sm object-center object-cover" />
                <div className="flex p-2">
                <h2 className="text-gray-s/80 w-full text-sm font-semibold capitalize leading-3 ">{item.title}</h2>
                <span className="text-gray-s/50 text-xs">Rs{price}</span>
                </div>
    </Link>
  )
}

export default Card