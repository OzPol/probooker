// components/ServiceDetails.tsx

import React from 'react';
import { Service } from '../types/appwrite.type';

interface ServiceDetailsProps {
  service: Service;
  onBack: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Back to Search</button>
      <div className="p-4 border rounded shadow-md">
        <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
        <p>{service.description}</p>
        <p>Price: ${service.price}</p>
        <p>Provider: {service.providerName}</p>
        <p>Category: {service.category}</p>
        {/* You can add more fields if needed */}
      </div>
    </div>
  );
};

export default ServiceDetails;
