import { useEffect, useState } from 'react';
import { databases} from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';
import ChangePasswordForm from './UpdatePassword';
import UpdateProfileForm from './UpdateProfileForm';

const CustomerAccountDetails: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeSetting, setActiveSetting] = useState<string | null>(null);

useEffect(() => {
  const fetchProfile = async () => {
    try {
        // Retrieve the session information from local storage
      const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
      
      if (!session || !session.userId) {
        setMessage('No active session found. Please log in.');
        return;
      }

      // Fetch user profile from the collection
      const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          process.env.CONSUMER_COLLECTION_ID!, 
        [ sdk.Query.equal('userId', session.userId)]
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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
    setActiveSetting(null);
  };

  const handleSettingClick = (setting: string) => {
    setActiveSetting(setting);
  };

  return (
<div className="bg-gray-100 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4 border-b border-gray-300 pb-4">
        <div className="flex items-center">
          <div className="w-40 h-40 flex items-center justify-center rounded-full">
            <img className="w-32 h-32 rounded-full" src={profile?.profileImg} alt={profile?.name} />
          </div>
          <div className="mx-6">
            <h2 className="font-bold text-lg">{profile?.name}</h2>
            <p>{profile?.city}, {profile?.state}</p>
            <p>Stars (Rating): {profile?.rating}</p>
            <p>Joined On: {profile?.createdAt?.substring(0, 10)}</p>
            <p>User Type: {profile?.userType}</p>
          </div>
        </div>
        <div className="w-5/12 items-center justify-center mt-10">
          <h3 className=""><span className="label mt-1">Phone:</span>{profile?.phone}</h3>
          <h3 className=""><span className="label">e-mail:</span>{profile?.email}</h3>
          <h3 className=""><span className="label">Address:</span>{profile?.address}</h3>
        </div>
      </div>
      <div className="flex">
        <div className="w-full p-4">
          <h3 className="my-4 cursor-pointer" onClick={() => toggleSection('accountSettings')}>
            Account Settings
          </h3>
          {expandedSection === 'accountSettings' && (
            <div className="p-4 bg-white rounded shadow">
              <p className="cursor-pointer my-2 font-bold" onClick={() => handleSettingClick('changePassword')}>Change Password</p>
              {activeSetting === 'changePassword' && profile && (
                <div className="mt-4">
                  <ChangePasswordForm userId={profile.userId} />
                </div>
              )}
              <p className="cursor-pointer my-2 font-bold" onClick={() => handleSettingClick('updateAccountInfo')}>Update Account Info</p>
              {activeSetting === 'updateAccountInfo' && profile && (
                <div className="mt-4">
                  <UpdateProfileForm profile={profile} />
                </div>
              )}
              {console.log(profile.$id)}
            </div>
          )}
          <h3 className="my-4 cursor-pointer" onClick={() => toggleSection('currentBookings')}>
            Current Bookings
          </h3>
          {expandedSection === 'currentBookings' && (
            <div className="p-4 bg-white rounded shadow">
              <p>Current bookings content...</p>
            </div>
          )}
          <h3 className="my-4 cursor-pointer" onClick={() => toggleSection('myReviews')}>
            My Reviews
          </h3>
          {expandedSection === 'myReviews' && (
            <div className="p-4 bg-white rounded shadow">
              <p>My reviews content...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CustomerAccountDetails;

  