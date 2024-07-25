import React, { useEffect, useState } from 'react';
import CreateServiceForm from './ServiceCreateForm';
import ServiceCard from './ServiceCard';
import { Service } from '../types/appwrite.type';
import { fetchAndFilterServices } from './DataServiceProvider';
import AvailabilityCalendar from './AvailabilityCalendar';

const ServiceServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([
    // Mocked available dates
    new Date('2024-07-25'),
    new Date('2024-07-26'),
    new Date('2024-07-27'),
  ]);

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
                name={service.name}
                description={service.description}
                price={service.price}
                providerName={service.providerName}
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
        <div>
          <h2 className="text-2xl font-bold mb-4">{selectedService.name}</h2>
          <p>{selectedService.description}</p>
          <p>Provider: {selectedService.providerName}</p>
          <p>Price: ${selectedService.price}</p>
          <h3 className="text-xl font-bold mt-4">Manage Availability</h3>
          <AvailabilityCalendar availableDates={availableDates} />
          <button
            onClick={() => setSelectedService(null)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Back to Services
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceServices;

/*
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
      <h2 className="text-2xl font-bold mb-4">Home improvement, made easy.</h2>
      {// <p>This is a placeholder for the service providers to see their services.</p> }
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

*/