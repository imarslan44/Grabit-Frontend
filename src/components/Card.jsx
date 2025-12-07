import React from 'react'

const Card = ({item, index}) => {
  return (
    <div className="w-50 h-60 bg-white-p rounded-sm p-3 hover:opacity-80 duration-50  " key={index}>
                <img src={item?.images[0]} alt="" className="w-full h-6/7 " />
                <div className="flex">
                <h2 className="text-gray-s/80 w-full text-sm font-semibold capitalize leading-5 ">{item.name}</h2>
                <span className="text-gray-s/50 ">rs{item.price}</span>
                </div>
    </div>
  )
}

export default Card