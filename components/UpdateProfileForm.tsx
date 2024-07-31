import React, { useState } from 'react';
import { users, databases } from '../lib/appwrite.config';

const UpdateProfileForm: React.FC<{ profile: any }> = ({ profile }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [city, setCity] = useState(profile.city);
  const [state, setState] = useState(profile.state);
  const [zipcode, setZipcode] = useState(profile.zipcode);
  const [profileImg, setProfileImg] = useState(profile.profileImg);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (phone !== profile.phone) {
        await users.updatePhone(profile.userId, phone);
      }
      if (email !== profile.email) {
        await users.updateEmail(profile.userId, email);
      }
      if (name !== profile.name) {
        await users.updateName(profile.userId, name);
      }
      var collectionID = "";
      if(profile.userType==="Consumer"){
        collectionID = process.env.CONSUMER_COLLECTION_ID!
      }
      else if(profile.userType==="Provider"){
        collectionID = process.env.SERVICEPROVIDER_COLLECTION_ID!
      }
      await databases.updateDocument(
        process.env.DATABASE_ID!,
        collectionID,
        profile.$id,
        { name, email, phone, address, city, state, zipcode, profileImg }
      );
      setMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold">
          Name:
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
          Email:
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
        <label htmlFor="phone" className="font-semibold">
          Phone:
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
        <label htmlFor="city" className="font-semibold">
          City:
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
          State:
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
      <div className="flex flex-col">
        <label htmlFor="profileImg" className="font-semibold">
          Profile Image:
        </label>
        <input
          type="text"
          id="profileImg"
          value={profileImg}
          onChange={(e) => setProfileImg(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Update Info
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default UpdateProfileForm;
