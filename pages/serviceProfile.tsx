// pages/serviceProfile.tsx

// This is the Service User Profile View Page 
// A sidebard menu with links for actions and a main content area to display Services, search etc. 
// This page is only accessible to logged in users.

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ServiceProfileOverview from '../components/ServiceProfileOverview';
import ServiceViewBookings from '../components/ServiceViewBookings';
import ServiceAccountDetails from '../components/ServiceAccountDetails';
import ServiceServices from '../components/ServiceServices';
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
      default:
        return <ServiceProfileOverview />;
    }
  };

  return (
    <div className="flex min-h-screen provider-background">
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Service Provider Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                  activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Profile Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                  activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                View Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                  activeTab === 'account' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Account Details
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('service')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${
                  activeTab === 'service' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                My Services
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 mb-2 rounded bg-red-500 text-white"
              >
                Logout
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

