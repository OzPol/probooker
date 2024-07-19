import { useEffect, useState } from 'react';
import { databases, DATABASE_ID, SERVICE_PROVIDER_COLLECTION_ID} from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';

const ServiceProfileOverview: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve session info from local storage
        const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
        
        if (!session || !session.userId) {
          setMessage('No active session found. Please log in.');
          return;
        }

        // Fetch provider profile from provider collection
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!, //DBID
          process.env.SERVICE_PROVIDER_COLLECTION_ID!, //Collection ID
          [ 
            sdk.Query.equal('userId', session.userId)
          ]
        );

        if (response.documents.length > 0) {
          setProfile(response.documents[0]);
        } else {
          setMessage('Profile not found.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage('Error fetching profile.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile Overview</h2>
      {message && <p>{message}</p>}
      {profile ? (
        <div>
        <div>
          <h2>{profile.name}</h2>
          <p>User ID: {profile.userId}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          {/* <p>Address: {profile.address}</p>
          <p>City: {profile.city}</p>
          <p>State: {profile.state}</p>
          <p>Zipcode: {profile.zipcode}</p>
          <p>Create On: {profile.createon}</p> */}
          <p>User Type: {profile.userType}</p>
          {/* <p>Profile Image: <img src={profile.profileImg} alt="Profile" /></p> */}
          <p>Bookings: {profile.bookings.join(', ')}</p>

          {/* Add other profile fields as needed */}
        </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ServiceProfileOverview;
