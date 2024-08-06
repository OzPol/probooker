import { useEffect, useState } from 'react';
import { databases } from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';

const CustomerProfileOverview: React.FC = () => {
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

        // Fetch user profile from user collection
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          process.env.CONSUMER_COLLECTION_ID!,
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
    <div className="px-16">
      <h2 className="text-2xl font-bold mb-4">Profile Overview</h2>
      {message && <p className="text-red-500">{message}</p>}
      {profile ? (
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6">
            <div className="w-60 h-60 rounded-full border-2 border-gray-300 overflow-hidden">
              <img src={profile.profileImg || 'path/to/default/image.jpg'} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="w-full max-w-md">
            <div className="flex justify-between py-2">
              <span className="font-semibold">ID:</span>
              <span>{profile.userId}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold">Email:</span>
              <span>{profile.email}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold">Phone:</span>
              <span>{profile.phone}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold">User Type:</span>
              <span>{profile.userType}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold">User Name:</span>
              <span>{profile.name}</span>
            </div>
            {/* Add other profile fields as needed */}
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default CustomerProfileOverview;
