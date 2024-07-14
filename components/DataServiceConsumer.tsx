import React, { useEffect, useState } from 'react';
import { databases } from '../lib/appwrite.config'; // Adjust the import according to your setup
import { Service } from '../types/appwrite.type';

const DATABASE_ID = 'DATABASE_ID'; // Replace with your actual database ID
const SERVICE_COLLECTION_ID = 'SERVICE_COLLECTION_ID'; // Replace with your actual collection ID

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, SERVICE_COLLECTION_ID);
        const fetchedServices = response.documents.map((doc: any) => ({
          $id: doc.$id,
          name: doc.title, // Assuming the document has a field called 'title' that corresponds to 'name'
          description: doc.description,
          price: doc.price,
          providerId: doc.providerId,
          providerName: doc.serviceProvider, // Assuming 'serviceProvider' is the field name
        }));

        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Service List</h2>
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
    </div>
  );
};

export default ServiceList;
