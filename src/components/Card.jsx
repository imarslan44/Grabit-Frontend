// src/components/Card.jsx
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item, styles }) => {
  const variant = item?.variants?.[0];
  const image = variant?.images?.[0] || item.image || "";
  const price =
    variant?.price ||
    variant?.sizes?.[0]?.price ||
    item.price ||
    "—";

  return (
    <Link to={`/product/${item._id}`}>
      <article
  className={`mb-2  break-inside-avoid bg-white border border-gray-200/80 rounded-xs overflow-hidden transition-shadow duration-200 hover:shadow-md p-1 ${styles}`}
>
  {/* IMAGE */}
  <div className="w-full aspect-9/8  bg-gray-100 overflow-hidden rounded-sm">
    <img
      src={image}
      alt={item.title}
      loading="lazy"
      className="w-full object-cover object-center "
    />
  </div>

  {/* CONTENT */}
  <div className="p-3 space-y-1 ">
    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
      {item.title}
    </h3>
    <div className="flex items-center justify-between">
      <h3>HElll world Lorem ipsum dolor sit amet.</h3>
      <span className="text-sm font-semibold text-gray-900">₹ {price}</span>
      {item.category && (
        <span className="text-xs text-gray-500 capitalize">{item.category}</span>
        
      )}
    </div>
  </div>
</article>

    </Link>
  );
};

export default Card;

