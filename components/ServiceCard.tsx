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
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, price, providerName }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
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

