// ./pages/providerProfile/[providerId].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { databases } from '../../lib/appwrite.config';
import BookingForm from '../../components/BookingForm'; // Adjust the import path if necessary

const ProviderProfile = () => {
  const router = useRouter();
  const { providerId } = router.query;
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await databases.getDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_SERVICEPROVIDER_COLLECTION_ID!,
          providerId as string
        );
        setProfile(response);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (providerId) {
      fetchProfile();
    }
  }, [providerId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>Address: {profile.address}</p>
      <p>City: {profile.city}</p>
      <p>State: {profile.state}</p>
      <p>Zipcode: {profile.zipcode}</p>
      <p>Description: {profile.description}</p>
      {/* Add more profile fields as needed */}

      <h2 className="text-2xl font-bold mt-8 mb-4">Book a Service</h2>
      <BookingForm providerId={providerId as string} serviceId="selectedServiceId" /> {/* Replace with actual service ID */}
    </div>
  );
};

export default ProviderProfile;
