// Moving from Shawn's register.tsx page to CreateUserPage.tsx component as intended
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { users, databases } from '../lib/appwrite.config';

const CreateUserPage: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [createon, setCreateon] = useState(new Date().toISOString());
  const [bookings, setBookings] = useState<string[]>([]);
  const [userType, setUserType] = useState<'Consumer'>('Consumer');
  const [profileImg, setProfileImg] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Creating new user auth on Appwrite
      const newUser = await users.create('unique()', email, phone, password, name);
      // users.updatePhone(newUser.$id, phone);
      await users.updateLabels(newUser.$id, [userType]);

      // Creating new consumer document in Appwrite
      const consumer = await databases.createDocument(
        process.env.DATABASE_ID!,//DBID
        process.env.CONSUMER_COLLECTION_ID!,//Collection ID
        'unique()', 
        {
          userId: newUser.$id,
          email,
          phone,
          name,
          address,
          city,
          state,
          zipcode,
          createon,
          bookings,
          userType,
          profileImg,
        }
      );

      setMessage(`User ${newUser.name} created successfully as a Consumer`);
      setIsUserCreated(true);
    } catch (error:any) {
      console.error('Error creating user or consumer:', error);
      console.log(error.code+":"+error.type);
      setMessage('Error creating user or consumer');
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: "url('https://www.blurb.com/blog/wp-content/uploads/2023/06/How-to-Design-a-Book-Cover_1.jpg')" }}>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Create User</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
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
            <label htmlFor="address" className="font-semibold">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="font-semibold">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state" className="font-semibold">State:</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-300 rounded p-1 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zipcode" className="font-semibold">Zipcode:</label>
            <input
              type="text"
              id="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
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
          <div className="flex flex-col">
            <label htmlFor="userType" className="font-semibold">User Type:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value as 'Consumer')}
              required
              className="border border-gray-300 rounded p-1 mt-1"
            >
              <option value="Consumer">Consumer</option>
              {/* <option value="Provider">Provider</option>
              <option value="Admin">Admin</option> */}
            </select>
          </div>
          <div className="flex justify-center">
            {!isUserCreated && <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Create User</button>}
          </div>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        <div className="flex justify-center mt-1">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleGoBack}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;