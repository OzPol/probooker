// ./src/pages/provider-availability.tsx
// This is the Provider Availability Page
// A page to set the availability of a provider
// This page is only accessible to logged in users.
import React from 'react';
import ProviderSetAvailability from '../components/ProviderSetAvailability';

const ProviderAvailabilityPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <ProviderSetAvailability />
    </div>
  );
};

export default ProviderAvailabilityPage;
