// components/ServiceProviderDashboard.tsx

import React from 'react';

interface ServiceProviderDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
  children: React.ReactNode; // Accept children props
}

const ServiceProviderDashboard: React.FC<ServiceProviderDashboardProps> = ({ activeTab, setActiveTab, handleLogout, children }) => {
  return (
    <div className="flex min-h-screen justify-right provider-background-profile">
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Service Provider Dashboard</h2>
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
                Manage Bookings
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
                onClick={() => setActiveTab('service')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'service' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Manage Services
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
        {children} {/* Render children */}
      </main>
    </div>
  );
};

export default ServiceProviderDashboard;
