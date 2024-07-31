import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { databases } from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';

const CreateServiceForm: React.FC = () => {
  const [sessionData, setSessionData] = useState<any>(null);
  const [providerId, setProviderId] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [serviceProvider, setServiceProvider] = useState('');
  const [category, setCategory] = useState('');
  const [ratings] = useState<number[]>([]);
  const [jobsCompleted] = useState<number>(0);
  const [reviews] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZip] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('appwriteSession');
    if (session) {
      const sessionData = JSON.parse(session);
      setSessionData(sessionData);
      setProviderId(sessionData.userId);

      // Fetch provider address
      fetchProviderAddress(sessionData.userId);
    }
  }, []);

  const fetchProviderAddress = async (providerId: string) => {
    try {
      const response = await databases.listDocuments(
        process.env.DATABASE_ID!,
        process.env.SERVICEPROVIDER_COLLECTION_ID!,
        [sdk.Query.equal('userId', providerId)]
      );

      if (response.documents.length > 0) {
        const provider = response.documents[0];
        setAddress(provider.address + ', ' + provider.city+', '+provider.state+', '+provider.zipcode); 
        setCity(provider.city);
        setZip(provider.zipcode);
        setServiceProvider(provider.name);
      } else {
        setMessage('Provider address not found.');
      }
    } catch (error) {
      console.error('Error fetching provider address:', error);
      setMessage('Error fetching provider address. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Creating new service document in Appwrite
      const newService = await databases.createDocument(
        process.env.DATABASE_ID!,
        process.env.SERVICE_COLLECTION_ID!,
        'unique()',
        {
          title,
          summary,
          description,
          price,
          serviceProvider,
          category,
          ratings,
          jobsCompleted,
          reviews,
          providerId,
          address,
          city,
          zipcode
        }
      );

      setMessage(`Service ${newService.$id} created successfully.`);
      clearFormFields();
    } catch (error: any) {
      console.error('Error creating service:', error);
      console.log(error.code + ":" + error.type);
      setMessage('Error creating service. Please try again.');
    }
  };

  const clearFormFields = () => {
    setTitle('');
    setDescription('');
    setPrice(undefined);
    setServiceProvider('');
    setCategory('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Create New Service</h3>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        {/* <div className="flex flex-col">
          <label htmlFor="serviceProvider" className="font-semibold">
            <span className="text-red-500">*</span> Provider Name :
          </label>
          <input
            type="text"
            id="serviceProvider"
            value={serviceProvider}
            onChange={(e) => setServiceProvider(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 mt-1"
          />
        </div> */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-semibold">
            <span className="text-red-500">*</span> Service Title :
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="summary" className="font-semibold">Summary :</label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="border h-12 border-gray-300 rounded p-2 mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded p-2 mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-semibold">Price :</label>
          <input
            type="number"
            id="price"
            value={price || ''}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="border border-gray-300 rounded p-2 mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="font-semibold">
            <span className="text-red-500">*</span> Category :
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border border-gray-300 rounded p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Create Service
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};
export default CreateServiceForm;
