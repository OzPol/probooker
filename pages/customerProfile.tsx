// pages/customerProfile.tsx

// This is the Customer Profile View Page 
// A sidebard menu with links for actions and a main content area to display Services, search etc. 

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CustomerProfileOverview from '../components/CustomerProfileOverview';
import CustomerViewBookings from '../components/CustomerViewBookings';
import CustomerAccountDetails from '../components/CustomerAccountDetails';
import CustomerSearchServices from '../components/CustomerSearchServices';
import { logout } from '../lib/authUtils';

const CustomerProfile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

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
    <div className="flex min-h-screen bg-gray-50">
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
      <main className="w-3/4 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default CustomerProfile;
