// pages/customerProfile.tsx

// This is the Customer Profile View Page 
// A sidebard menu with links for actions and a main content area to display Services, search etc. 
// This page is only accessible to logged in users.

// pages/customerProfile.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CustomerProfileOverview from '../components/CustomerProfileOverview';
import CustomerViewBookings from '../components/CustomerViewBookings';
import CustomerAccountDetails from '../components/CustomerAccountDetails';
import CustomerSearchServices from '../components/CustomerSearchServices';
import { logout } from '../lib/authUtils';
import EnvCheck from '../components/EnvCheck';

const CustomerProfile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('appwriteSession');
    const userType = localStorage.getItem('userType');
    if (session && userType === 'Customer') {
      setIsAuthenticated(true);
    } else {
      router.push('/customer-login');
    }
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push('/customer-login');
  };

  if (!isAuthenticated) {
    return null; // Render nothing until authentication status is determined
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CustomerProfileOverview />;
      case 'bookings':
        return <CustomerViewBookings />;
      case 'account':
        return <CustomerAccountDetails />;
      case 'search':
        return <CustomerSearchServices />;
      default:
        return <CustomerProfileOverview />;
    }
  };

  return (
    <div className="flex min-h-screen customer-background-profile">
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Customer Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Profile Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                View Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'account' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Account Details
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('search')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'search' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Search Services
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
      <div>
      <h1>Environment Variables Check</h1>
      <EnvCheck />
    </div>
    </div>
  );
};

export default CustomerProfile;

/*
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CustomerProfileOverview from '../components/CustomerProfileOverview';
import CustomerViewBookings from '../components/CustomerViewBookings';
import CustomerAccountDetails from '../components/CustomerAccountDetails';
import CustomerSearchServices from '../components/CustomerSearchServices';
import { logout } from '../lib/authUtils';

const CustomerProfile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('appwriteSession');
    const userType = localStorage.getItem('userType');
    if (session && userType === 'Customer') {
      setIsAuthenticated(true);
    } else {
      router.push('/customer-login');
    }
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push('/customer-login');
  };

  if (!isAuthenticated) {
    return null; // Render nothing until authentication status is determined
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CustomerProfileOverview />;
      case 'bookings':
        return <CustomerViewBookings />;
      case 'account':
        return <CustomerAccountDetails />;
      case 'search':
        return <CustomerSearchServices />;
      default:
        return <CustomerProfileOverview />;
    }
  };

  return (
    <div className="flex min-h-screen customer-background">
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Customer Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Profile Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                View Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'account' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Account Details
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('search')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'search' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Search Services
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

export default CustomerProfile;

*/