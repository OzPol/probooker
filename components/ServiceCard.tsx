import React from 'react';
import { ServiceCardProps } from '../types/appwrite.type';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, summary, description, price, providerName, providerID, category, city, providerIcon, rating, imageUrl, onClick, onViewProfile, onProviderClick }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden m-2 p-2 flex flex-col h-84 cursor-pointer">
      <div className="flex justify-between mb-1" onClick={onClick}>
        <div>
          <h2 className="text-lg font-bold items-center line-clamp-1">{title}</h2>
        </div>
        <div className="flex items-center">
          <span className="text-black py-1 px-1 bg-green-100 rounded justify-self-end">{"⭐"+rating}</span>
        </div>
      </div>
      <div className="mb-1" onClick={onClick}>
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      </div>
      <div className="mb-1 flex-grow" onClick={onClick}>
        <p className="text-gray-700 line-clamp-2">{summary}</p>
      </div>
      <div className="mb-1 flex-grow" onClick={onClick}>
        <span className="text-sm">Starting From: </span>
        <span className="text-blue-700 font-bold ">${price}</span>
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-gray-500 text-sm">{city}</span>
        <div className="flex items-center" onClick={onProviderClick}>
          <p className="text-gray-600 italic text-sm cursor-pointer">{providerName}</p>
          <img src={providerIcon} alt={providerName} className="w-8 h-8 rounded-full mr-2" />
        </div>
      </div>
      {/* {onViewProfile && (
        <button
          onClick={onViewProfile}
          className="absolute bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          View Profile
        </button>
      )} */}
    </div>
  );
};

export default ServiceCard;
