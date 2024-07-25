// inspired by AdrianHajdin's CardCard component
// https://github.com/adrianhajdin/project_next13_car_showcase/blob/main/components/CarCard.tsx
// a card component to display each service,
// which will be used in the services page to display services in a grid format

import React from 'react';
import { ServiceCardProps } from '../types/appwrite.type';

// interface ServiceCardProps {
//   name: string;
//   description: string;
//   price: number;
//   providerName: string;
//   onClick: () => void;
//   onViewProfile?: () => void; // Optional prop for viewing profile
//   onProviderClick: () => void; // prop for provider click
// }

const ServiceCard: React.FC<ServiceCardProps> = ({ title, summary, description, price, providerName, providerID,category, onClick, onViewProfile, onProviderClick }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4 flex flex-col justify-between">
      <div onClick={onClick} className="cursor-pointer flex-grow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="text-right mb-4">
          <span className="text-blue-500 font-bold">${price}</span>
        </div>
      </div>
      <p className="text-gray-600 italic cursor-pointer" onClick={onProviderClick}>Provider: {providerName}</p>
      {onViewProfile && (
        <button
          onClick={onViewProfile}
          className="absolute bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          View Profile
        </button>
      )}
    </div>
  );
};

export default ServiceCard;