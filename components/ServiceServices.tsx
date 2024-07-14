import React, { useEffect, useState } from 'react';
import CreateServiceForm from './ServiceCreateForm';
import ServiceCard from './ServiceCard';
import { Service } from '../types/appwrite.type';
import { fetchAndFilterServices } from './DataServiceProvider';

const ServiceServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Services</h2>
      <p>This is a placeholder for the service providers to see their services.</p>
      <input
        type="text"
        placeholder="🔍Filter services"
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredServices.map(service => (
          <ServiceCard
            key={service.$id}
            name={service.name}
            description={service.description}
            price={service.price}
            providerName={service.providerName}
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
    </div>
  );
};

export default ServiceServices;
