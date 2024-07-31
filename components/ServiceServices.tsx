// components/ServiceServices.tsx

import React, { useEffect, useState } from 'react';
import CreateServiceForm from './ServiceCreateForm';
import ServiceCard from './ServiceCard';
import { Service } from '../types/appwrite.type';
import { fetchAndFilterServices } from './DataServiceProvider';
import ServiceDetails from './ServiceDetails';

const ServiceServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const fetchedServices = await fetchAndFilterServices();
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

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage My Services</h2>
      <input
        type="text"
        placeholder="🔍 Filter services"
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded"
      />
      {!selectedService ? (
        <>
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
                onClick={() => handleServiceClick(service)}
              />
            ))}
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden m-4 flex justify-center items-center border-2 border-dashed border-gray-400 text-gray-400 text-8xl font-bold cursor-pointer"
              onClick={toggleFormVisibility}
            >
              +
            </div>
          </div>
          {isFormVisible && (
            <div className="mt-8">
              <CreateServiceForm />
            </div>
          )}
        </>
      ) : (
        <ServiceDetails service={selectedService} onBack={() => setSelectedService(null)} />
      )}
    </div>
  );
};

export default ServiceServices;