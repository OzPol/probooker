// This is the Service User Profile View Page 
// A sidebard menu with links for actions and a main content area to display Services, search etc. 
import { useState } from 'react';
import ServiceProfileOverview from '../components/ServiceProfileOverview';
import ServiceViewBookings from '../components/ServiceViewBookings';
import ServiceAccountDetails from '../components/ServiceAccountDetails';
import ServiceServices from '../components/ServiceServices';

const ProviderProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
    <div className="flex min-h-screen bg-gray-50">
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
          </ul>
        </nav>
      </aside>
      <main className="w-3/4 p-8">{renderContent()}</main>
    </div>
  );
};

export default ProviderProfile;
