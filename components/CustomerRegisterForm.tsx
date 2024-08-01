// components/CustomerRegisterForm.tsx
// This component is similar to the ProviderRegisterForm component.
// It displays a form for customers to register with their email, password, 
// name, phone, address, city, state, zipcode, and profile image URL.

'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { users, databases } from '../lib/appwrite.config';

const CustomerRegisterForm: React.FC = () => {
  const router = useRouter();
  const created = useState(new Date().toISOString());
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    profileImg: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      const newUser = await users.create('unique()', formData.email, formData.phone, formData.password, formData.name);
      //await users.updatePhone(newUser.$id, formData.phone);
      await users.updateLabels(newUser.$id, ["Consumer"]);
      console.log(formData.profileImg);

      await databases.createDocument(
        process.env.DATABASE_ID!,
        process.env.CONSUMER_COLLECTION_ID!,
        'unique()',
        {
          userId: newUser.$id,
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          profileImg: formData.profileImg,
          userType:"Consumer",
          //createon:created
        }
      );

      setMessage('User created successfully.');
      router.push('/customer-login');
    } catch (error: any) {
      console.error('Error creating user:', error);
      setMessage('Error creating user. Please try again.');
    }
  };

  const handleSwitchToLogin = () => {
    router.push('/customer-login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Customer Registration</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.zipcode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="profileImg"
          placeholder="Profile Image URL"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={formData.profileImg}
          onChange={handleChange}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Register
        </button>
        {message && <p className="mt-2 text-red-500">{message}</p>}
        <button
          type="button"
          className="w-full mt-2 text-blue-500 underline"
          onClick={handleSwitchToLogin}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default CustomerRegisterForm;
