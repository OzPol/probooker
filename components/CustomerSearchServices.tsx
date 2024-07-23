// components/CustomerSearchServices.tsx
import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import BookingForm from './BookingForm';
import { Service } from '../types/appwrite.type';
import { fetchAllServices } from './DataServiceConsumer';
import AvailabilityCalendar from './AvailabilityCalendar';
import { useRouter } from 'next/router'; // Import useRouter for navigation

const CustomerSearchServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([
    // Mocked available dates
    new Date('2024-07-25'),
    new Date('2024-07-26'),
    new Date('2024-07-27'),
  ]);
  const router = useRouter(); // Initialize useRouter

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

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleViewProfile = (providerId: string) => {
    router.push(`/providerProfile/${providerId}`);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Home improvement, made easy.</h2>
      <input
        type="text"
        placeholder="🔍 What's on your to do list ? "
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 "
      />
      {!selectedService ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredServices.map(service => (
            <ServiceCard
              key={service.$id}
              name={service.name}
              description={service.description}
              price={service.price}
              providerName={service.providerName}
              onClick={() => handleServiceClick(service)}
              onViewProfile={() => handleViewProfile(service.providerId)} // Pass the providerId to handleViewProfile
            />
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Booking: {selectedService.name}</h2>
          <p>{selectedService.description}</p>
          <p>Provider: {selectedService.providerName}</p>
          <p>Price: ${selectedService.price}</p>
          <AvailabilityCalendar availableDates={availableDates} />
          <BookingForm />
          <button
            onClick={() => setSelectedService(null)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Back to Search
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerSearchServices;




/*

import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import { Service } from '../types/appwrite.type';
import { fetchAllServices } from './DataServiceConsumer';

  const CustomerSearchServices: React.FC = () => {
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
        <h2 className="text-3xl font-bold mb-4">Home improvement, made easy.</h2>
        {}
        <input
          type="text"
          placeholder="🔍 What's on your to do list ? "
          value={filter}
          onChange={handleFilterChange}
          className="mb-4 p-2 border rounded w-1/3 sm:w-1/3 md:w-1/3 lg:w-1/3"
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
        </div>
      </div>
    );
  };
  
  export default CustomerSearchServices;
  
  */