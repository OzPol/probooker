import React, { useState } from 'react';
import { databases } from '../lib/appwrite.config';

const UpdateServiceForm: React.FC<{ service: any }> = ({ service }) => {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);
  const [summary, setSummary] = useState(service.summary);
  const [category, setCategory] = useState(service.category);
  const [address, setAddress] = useState(service.address);
  const [zipcode, setZipcode] = useState(service.zipcode);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await databases.updateDocument(
        process.env.DATABASE_ID!,
        process.env.SERVICE_COLLECTION_ID!,
        service.$id,
        { title, description, price, summary, category, address, zipcode }
      );
      setMessage('Service updated successfully');
    } catch (error) {
      console.error('Error updating service:', error);
      setMessage('Error updating service');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="title" className="font-semibold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="summary" className="font-semibold">
          Summary:
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1 h-12"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="font-semibold">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="price" className="font-semibold">
          Price:
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="category" className="font-semibold">
          Category:
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="address" className="font-semibold">
          Address:
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="zipcode" className="font-semibold">
          Zipcode:
        </label>
        <input
          type="text"
          id="zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Update Service
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default UpdateServiceForm;
