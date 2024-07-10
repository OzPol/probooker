import { useEffect, useState } from 'react';
import { mockServices } from '../mockData';
import { Service } from '../types';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      // Simulate API call with mock data
      setServices(mockServices);
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1>Services</h1>
      <ul>
        {services.map(service => (
          <li key={service.$id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>${service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;



/*

import { useEffect, useState } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1>Services</h1>
      <ul>
        {services.map(service => (
          <li key={service.$id}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>${service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;


*/