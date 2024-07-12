import React, { useState } from 'react';
import * as sdk from 'node-appwrite';

const client = new sdk.Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('Project_ID')//change to real one
    .setKey('API_KEY');//change to real one
  
const users = new sdk.Users(client);
const databases = new sdk.Databases(client);

const CreateUserPage: React.FC = () => {
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
  const [userType, setUserType] = useState<'Consumer' | 'Provider' | 'Admin'>('Consumer');
  const [profileImg, setProfileImg] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Creating a new user on Appwrite
      const newUser = await users.create('unique()', email,phone, password, userId);

      // Creating a new consumer document in Appwrite
      const consumer = await databases.createDocument(
        'DBID', //change to real one
        'COLLECTIONID', //change to real one
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

      setMessage(`User ${newUser.name} created successfully with consumer data`);
    } catch (error) {
      console.error('Error creating user or consumer:', error);
      setMessage('Error creating user or consumer');
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">UserId:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            type="text"
            id="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="profileImg">Profile Image URL:</label>
          <input
            type="url"
            id="profileImg"
            value={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userType">User Type:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'Consumer' | 'Provider' | 'Admin')}
            required
          >
            <option value="Consumer">Consumer</option>
            <option value="Provider">Provider</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateUserPage;
