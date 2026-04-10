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
    <Link 
      to={`/product/${item._id}`} 
      onClick={() => window.scrollTo(0, 0)}
    >
      <article
        className={`mb-2 break-inside-avoid bg-white border-1 border-gray-100 shadow-sm rounded-sm overflow-hidden duration-200 transition-all   hover:border-gray-100 hover:shadow-lg p-1 ${styles}`}
      >
        {/* IMAGE */}
        <div className="w-full flex items-start min-h-50 max-h-50 justify-baseline bg-white overflow-hidden rounded-sm ">
          <img
            src={image}
            alt={item.title}
            loading="lazy"
            className="w-full h-50 rounded-sm  object-contain   object-top"
          />    
          
        </div>

        {/* CONTENT */}
        <div className="p-1 space-y-2 h-22 bg-transparent ">
          <h3 className="text-sm font-medium text-gray-700 line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-main">₹ {price}</span>
            {item.category && (
              <span className="text-xs text-gray-400 uppercase translate-y-3 font-medium">{item.category}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Card;
