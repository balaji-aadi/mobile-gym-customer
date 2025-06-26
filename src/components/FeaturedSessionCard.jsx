import React from "react";
import { FaStar } from "react-icons/fa";

const FeaturedSessionCard = ({
  image,
  category,
  price,
  oldPrice,
  title,
  studio,
  location,
  time,
  trainer,
  rating,
  reviews,
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden w-72 flex-shrink-0">
    <img src={image} alt={title} className="w-full h-44 object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-center mb-1">
        <span className="uppercase text-xs font-bold tracking-widest text-gray-500">{category}</span>
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          {oldPrice && (
            <span className="text-xs text-gray-400 line-through ml-1">${oldPrice}</span>
          )}
        </div>
      </div>
      <div className="font-semibold text-lg truncate mb-1">{title}</div>
      <div className="text-sm text-gray-500 truncate">{studio} | {location}</div>
      <div className="text-sm text-gray-500">{time} w/ {trainer}</div>
      <div className="flex items-center mt-2">
        <div className="flex text-yellow-400 mr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className={i < Math.round(rating) ? "" : "text-gray-300"} size={14} />
          ))}
        </div>
        <span className="text-xs text-gray-600">{reviews} reviews</span>
      </div>
    </div>
  </div>
);

export default FeaturedSessionCard; 