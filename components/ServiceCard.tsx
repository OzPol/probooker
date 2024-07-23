// inspired by AdrianHajdin's CardCard component
// https://github.com/adrianhajdin/project_next13_car_showcase/blob/main/components/CarCard.tsx
// a card component to display each service,
// which will be used in the services page to display services in a grid format

import React from 'react';

interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  providerName: string;
  onClick: () => void;
  onViewProfile?: () => void; // Optional prop for viewing profile
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, price, providerName, onClick, onViewProfile }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4 flex flex-col justify-between">
      <div onClick={onClick} className="cursor-pointer flex-grow">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="text-right mb-4">
          <span className="text-blue-500 font-bold">${price}</span>
        </div>
        <p className="text-gray-600 italic">Provider: {providerName}</p>
      </div>
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




// components/ServiceCard.tsx

// Updating the ServiceCard component to accept an onClick prop for handling service selection:

/*
import React from 'react';

interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  providerName: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, price, providerName, onClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 cursor-pointer" onClick={onClick}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="text-right mb-4">
          <span className="text-blue-500 font-bold">${price}</span>
        </div>
        <p className="text-gray-600 italic">Provider: {providerName}</p>
      </div>
    </div>
  );
};

export default ServiceCard;


*/