import { useEffect, useState } from 'react';
import { mockServices } from '../mockData';
import { Service } from '../types';
import ServiceCard from '../components/ServiceCard';

// This is the page where services are listed and displayed. 

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      setServices(mockServices);
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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Services</h1>
      <input
        type="text"
        placeholder="Filter services"
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
            providerName = {service.providerName}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;




/*
// pages/services.tsx
// This is the page where services are listed and displayed. 
// When we connect API, it will be something like this :

import { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { Service } from '../types';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.map(service => (
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

export default Services;

*/
