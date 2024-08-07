// inspired by AdrianHajdin's CardCard component
// https://github.com/adrianhajdin/project_next13_car_showcase/blob/main/components/CarCard.tsx
// a card component to display each service,
// which will be used in the services page to display services in a grid format

// components/ServiceCard.tsx
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

/*
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  providerName: string;
  providerId: string;
  category: string;
  imageUrl?: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  providerName,
  providerId,
  category,
  imageUrl,
  onClick,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-700 mb-2">Provider: {providerName}</p>
        <p className="text-gray-900 font-bold">${price}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        <button
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={onClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

*/