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
        className={`mb-2 break-inside-avoid bg-white border-1 border-gray-200/50 rounded-sm overflow-hidden  duration-200 transition-all  hover:shadow-md hover:border-gray-200  p-1 ${styles}`}
      >
        {/* IMAGE */}
        <div className="w-full h-50 bg-white overflow-hidden rounded-sm object-contain">
          <img
            src={image}
            alt={item.title}
            loading="lazy"
            className=" w-full h-full  rounded-sm  object-contain object-bottom"
          />
        </div>

        {/* CONTENT */}
        <div className="p-1 space-y-2 h-22 ">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center justify-between">
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
