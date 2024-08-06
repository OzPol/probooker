// pages/customerProfile.tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CustomerProfileOverview from '../components/CustomerProfileOverview';
import CustomerViewBookings from '../components/CustomerViewBookings';
import CustomerAccountDetails from '../components/CustomerAccountDetails';
import CustomerSearchServices from '../components/CustomerSearchServices';
import ServiceDetails from '../components/ServiceDetails';
import ProviderProfileForCustomer from '../components/ProviderProfileForCustomer';
import { logout } from '../lib/authUtils';
import BookingForm from '../components/BookingForm';
import { Service } from '../types/appwrite.type';

const CustomerProfile = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('appwriteSession');
    const userType = localStorage.getItem('userType');
    if (session && userType === 'Customer') {
      setIsAuthenticated(true);
    } else {
      router.push('/customer-login');
    }
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url.startsWith('/customerProfile')) {
        const tab = url.split('#')[1];
        if (tab) {
          setActiveTab(tab);
          setSelectedService(null);
          setSelectedProvider(null);
        }
      }
    };

    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push('/customer-login');
  };

  const renderContent = () => {
    if (selectedService) {
      return (
        <>
          <ServiceDetails service={selectedService} onBack={() => setSelectedService(null)} />
        </>
      );
    }

    if (selectedProvider) {
      return <ProviderProfileForCustomer providerId={selectedProvider} onBack={() => setSelectedProvider(null)} />;
    }

    switch (activeTab) {
      case 'overview':
        return <CustomerProfileOverview />;
      case 'bookings':
        return <CustomerViewBookings />;
      case 'account':
        return <CustomerAccountDetails />;
      case 'search':
        return <CustomerSearchServices onServiceClick={setSelectedService} />;
      default:
        return <CustomerProfileOverview />;
    }
  };

  const navigateToTab = (tab: string) => {
    setActiveTab(tab);
    router.push(`/customerProfile#${tab}`);
  };

  return (
    <div className="flex min-h-screen customer-background-profile">
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Customer Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => navigateToTab('overview')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Profile Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToTab('bookings')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                View Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToTab('account')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'account' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Account Details
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToTab('search')}
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
