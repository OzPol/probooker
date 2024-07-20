// components/ProviderRegisterForm.tsx 

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { users, databases } from '../lib/appwrite.config';

const ProviderRegisterForm: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [bookings, setBookings] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [userType, setUserType] = useState<'Provider'>('Provider');
  const [unavailable, setUnavailable] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [profileImg, setProfileImg] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Creating new user auth on Appwrite
      console.log('Creating user with email:', email);
      const newUser = await users.create('unique()', email, password, name);
      console.log('User created:', newUser);

      console.log('Updating user phone:', phone);
      await users.updatePhone(newUser.$id, phone);
      console.log('Phone updated for user:', newUser.$id);

      console.log('Updating user labels:', [userType]);
      await users.updateLabels(newUser.$id, [userType]);
      console.log('Labels updated for user:', newUser.$id);

      // Creating new provider document in Appwrite
      console.log('Creating provider document for user:', newUser.$id);
      await databases.createDocument(
        process.env.DATABASE_ID!,
        process.env.SERVICEPROVIDER_COLLECTION_ID!,
        'unique()',
        {
          userId: newUser.$id,
          name,
          email,
          phone,
          address,
          city,
          state,
          zipcode,
          createdAt,
          bookings,
          ratings,
          userType,
          unavailable,
          services,
          profileImg,
        }
      );
      console.log('Provider document created for user:', newUser.$id);

      setMessage(`Provider ${newUser.name} created successfully with provider data`);
      setIsUserCreated(true);
    } catch (error: any) {
      console.error('Error creating user or provider:', error);
      console.log('Error code:', error.code);
      console.log('Error type:', error.type);
      setMessage(`Error creating user or provider: ${error.message}`);
    }
  };

  const handleGoBack = () => {
    router.push('/provider-login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create New Provider Account</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold">
              <span className="text-red-500">*</span> Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              <span className="text-red-500">*</span> Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold">
              <span className="text-red-500">*</span> Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold">
              <span className="text-red-500">*</span> Phone:
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="userType" className="font-semibold">User Type:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value as 'Provider')}
              required
              className="border border-gray-300 rounded p-1 mt-1"
            >
              <option value="Provider">Provider</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold">
              <span className="text-red-500">*</span> Address:
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
            <label htmlFor="city" className="font-semibold">
              <span className="text-red-500">*</span> City:
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="font-semibold">
              <span className="text-red-500">*</span> State:
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zipcode" className="font-semibold">
              <span className="text-red-500">*</span> Zipcode:
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
          <div className="flex flex-col">
            <label htmlFor="profileImg" className="font-semibold">Profile Image URL:</label>
            <input
              type="url"
              id="profileImg"
              value={profileImg}
              onChange={(e) => setProfileImg(e.target.value)}
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex justify-center">
            {!isUserCreated && <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Create Provider</button>}
          </div>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleGoBack}>Go Back to Login Page</button>
        </div>
      </div>
    </div>
  );
};

export default ProviderRegisterForm;
