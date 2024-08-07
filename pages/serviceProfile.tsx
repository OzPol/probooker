// pages/serviceProfile.tsx

// This is the Service User Profile View Page 
// A sidebard menu with links for actions and a main content area to display Services, search etc. 
// This page is only accessible to logged in users.
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ServiceProfileOverview from '../components/ServiceProfileOverview';
import ServiceViewBookings from '../components/ServiceViewBookings';
import ServiceAccountDetails from '../components/ServiceAccountDetails';
import ServiceServices from '../components/ServiceServices';
import ProviderSetAvailability from '../components/ProviderSetAvailability';
import ProviderAvailabilityView from '../components/ProviderViewAvailability';
import { logout } from '../lib/authUtils';

const ProviderProfile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('appwriteSession');
    const userType = localStorage.getItem('userType');
    if (session && userType === 'Provider') {
      setIsAuthenticated(true);
    } else {
      router.push('/provider-login');
    }
  }, [router]);

  useEffect(() => {
    const { tab } = router.query;
    if (tab) {
      setActiveTab(tab as string);
    }
  }, [router.query]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/serviceProfile?tab=${tab}`, undefined, { shallow: true });
  };

  const handleLogout = async () => {
    await logout();
    router.push('/provider-login');
  };

  if (!isAuthenticated) {
    return null; // Render nothing until authentication status is determined
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ServiceProfileOverview />;
      case 'bookings':
        return <ServiceViewBookings />;
      case 'account':
        return <ServiceAccountDetails />;
      case 'service':
        return <ServiceServices />;
      case 'availability':
        return (
          <>
            <ProviderSetAvailability />
            <ProviderAvailabilityView />
          </>
        );
      default:
        return <ServiceProfileOverview />;
    }
  };

  return (
    <div className="flex min-h-screen justify-right provider-background-profile">
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Service Provider Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => handleTabChange('overview')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                  activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Profile Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('bookings')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                  activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Manage Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('account')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                  activeTab === 'account' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Account Details
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('service')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                  activeTab === 'service' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Manage Services
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('availability')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                  activeTab === 'availability' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Manage Availability
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="w-3/4 p-8 content-background">
        {renderContent()}
      </main>
    </div>
  );
};

export default ProviderProfile;
