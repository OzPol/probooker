import React from 'react';
import { ServiceCardProvider } from '../types/appwrite.type';

const ServiceCard: React.FC<ServiceCardProvider> = ({ title, summary, description, price, providerName,  onClick }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4 flex flex-col justify-between">
      <div onClick={onClick} className="cursor-pointer flex-grow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="text-right mb-4">
          <span className="text-blue-500 font-bold">${price}</span>
        </div>
      </div>
      <p className="text-gray-600 italic cursor-pointer">Provider: {providerName}</p>
    </div>
  );
};

export default ServiceCard;
