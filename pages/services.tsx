import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import { Service } from '../types/appwrite.type';
import ServiceCard from '../components/ServiceCardCustomer';
import { fetchAllServices } from '../components/DataServiceConsumer';

// This is the page where services are listed and displayed.

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState('');
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

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleServiceClick = (service: Service) => {
    // Handle the click event for the service card here
    console.log(`Service clicked: ${service.name}`);
  };

  const handleViewProfile = (providerId: string) => {
    // Navigate to the provider profile page
    router.push(`/providerProfile/${providerId}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Services</h1>
      <input
        type="text"
        placeholder="Filter services"
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded w-full md:w-1/3"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

export default Services;


/*

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
