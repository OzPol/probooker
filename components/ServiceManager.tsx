import React, { useState, useEffect } from 'react';
import CreateServiceForm from './ServiceCreateForm'; // Adjust the import path
import { databases } from '../lib/appwrite.config'; // Adjust the import path
import { Service } from '../types/appwrite.type';

const DATABASE_ID = '668ca927003af0075110';
const SERVICE_COLLECTION_ID = '668ca9d9001dc5534dcf'; // Replace with your actual collection ID

const ServiceManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  const fetchServices = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, SERVICE_COLLECTION_ID);
      const fetchedServices = response.documents.map((doc: any) => ({
        $id: doc.$id,
        name: doc.title, // Adjust based on your actual field names
        description: doc.description,
        price: doc.price,
        providerId: doc.providerId,
        providerName: doc.serviceProvider, // Adjust based on your actual field names
      }));
      setServices(fetchedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceCreated = (newService: Service) => {
    setServices(prevServices => [...prevServices, newService]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map(service => (
          <div key={service.$id} className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{service.name}</h2>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <div className="text-right mb-4">
                <span className="text-blue-500 font-bold">${service.price}</span>
              </div>
              <p className="text-gray-600 italic">Provider: {service.providerName}</p>
            </div>
          </div>
        ))}
      </div>
      <CreateServiceForm onServiceCreated={handleServiceCreated} />
    </div>
  );
};

export default ServiceManager;
