import React, { useEffect, useState } from 'react';
import { Service } from '../types/appwrite.type';
import ServiceCard from './ServiceCard';
import { fetchAllServices } from './DataServiceConsumer';

const CustomerSearchServices: React.FC<{ onServiceClick: (service: Service) => void }> = ({ onServiceClick }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      const fetchedServices = await fetchAllServices();
      setServices(fetchedServices);
    };

    fetchServices();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Services</h2>
      <input
        type="text"
        placeholder="🔍 Filter services"
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredServices.map(service => (
          <ServiceCard
            key={service.$id}
            title={service.name}
            description={service.description}
            price={service.price}
            providerName={service.providerName}
            providerId={service.providerId}
            category={service.category}
            onClick={() => onServiceClick(service)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerSearchServices;
