import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { DATABASE_ID, SERVICEPROVIDER_COLLECTION_ID, users, databases } from '../lib/appwrite.config';

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
      const newUser = await users.create('unique()', email, phone, password, name);
      //await users.updatePhone(newUser.$id, phone);
      await users.updateLabels(newUser.$id, [userType]);

      // Creating new provider document in Appwrite
      const provider = await databases.createDocument(
        'DATABASE_ID',
        'SERVICEPROVIDER_COLLECTION_ID',
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

      setMessage(`Provider ${newUser.name} created successfully with provider data`);
      setIsUserCreated(true);
    } catch (error:any) {
      console.error('Error creating user or provider:', error);
      console.log(error.code + ":" + error.type);
      setMessage('Error creating user or provider');
    }
  };

  const handleGoBack = () => {
    router.push('/providerlogin');
  };

  return (
    <div>
      <h1>Create New Provider Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"><span style={{ color: 'red' }}>*</span>Name :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email"><span style={{ color: 'red' }}>*</span>Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password"><span style={{ color: 'red' }}>*</span>Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone"><span style={{ color: 'red' }}>*</span>Phone :</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="userType">User Type :</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'Provider')}
            required
          >
            <option value="Provider">Provider</option>
            {/* <option value="Consumer">Consumer</option>
            <option value="Admin">Admin</option> */}
          </select>
        </div>
        <div>
          <label htmlFor="address"><span style={{ color: 'red' }}>*</span>Address :</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city"><span style={{ color: 'red' }}>*</span>City :</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="state"><span style={{ color: 'red' }}>*</span>State :</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="zipcode"><span style={{ color: 'red' }}>*</span>Zipcode :</label>
          <input
            type="text"
            id="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="profileImg">Profile Image URL :</label>
          <input
            type="url"
            id="profileImg"
            value={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="unavailable">Unavailable Dates :</label>
          <input
            type="text"
            id="unavailable"
            value={unavailable.join(', ')}
            onChange={(e) => setUnavailable(e.target.value.split(',').map(date => new Date(date.trim()).toISOString()))}
          />
        </div> */}

        {!isUserCreated && <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">Create Provider</button>}
      </form>
      {message && <p>{message}</p>}
      <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleGoBack}>Go Back to Login Page</button>
    </div>
  );
};

export default ProviderRegisterForm;
