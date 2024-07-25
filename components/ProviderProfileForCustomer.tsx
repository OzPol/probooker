import React from 'react';

interface ProviderProfileForCustomerProps {
  provider: any;
  onBack: () => void;
}

const ProviderProfileForCustomer: React.FC<ProviderProfileForCustomerProps> = ({ provider, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">Back</button>
      <h2 className="text-2xl font-bold mb-2">{provider.name}</h2>
      <p className="text-gray-700 mb-4">{provider.description}</p>
      <p className="text-gray-600 italic">Location: {provider.location}</p>
      {/* more detail later */}
    </div>
  );
};

export default ProviderProfileForCustomer;
