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

  const scrollToTop = () => {
    
   
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    
  };

  return (
    <Link
      to={`/product/${item._id}`}
      onClick={scrollToTop}
    >
      <article
        className={` break-inside-avoid bg-white border-1 border-gray-100  shadow-gray-300 rounded-xl shadow-sm overflow-hidden duration-200 transition-all hover:border-gray-100 hover:shadow-lg p-3 mb-5 md:max-h-85 md:min-h-85 ${styles}`}
      >
        {/* IMAGE */}
        <div className="w-full bg-white overflow-hidden rounded-sm">
          <img
            src={image}
            alt={item.title}
            loading="lazy"
            className="w-full rounded-sm object-cover sm:h-50 sm:object-contain sm:object-top"
          />

        </div>

        {/* CONTENT */}
        <div className="p-1 space-y-2 bg-transparent ">
          <h3 className="text-sm font-medium text-gray-600 line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white bg-orange-400 rounded-sm px-2 ">₹ {price}</span>
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
