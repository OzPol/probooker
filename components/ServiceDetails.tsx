// components/ServiceDetails.tsx

import React from 'react';
import { Service } from '../types/appwrite.type';

const ServiceDetails = ({ service, onBack }: { service: Service, onBack: () => void }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{service.name}</h2>
      <p>{service.description}</p>
      <p>Provider: {service.providerName}</p>
      <p>Price: ${service.price}</p>
      <button
        onClick={onBack}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Back to Search
      </button>
    </div>
  );
};

export default ServiceDetails;
