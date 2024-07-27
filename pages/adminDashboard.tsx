import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminCustomerUsers from '@/components/AdminCustomerUsers';
import AdminServiceUsers from '@/components/AdminServiceUsers';
import { logout } from '../lib/authUtils';

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('customerUsers');
  const [isAuthenticated, setIsAuthenticated] = useState(false);// State to track selected provider

  useEffect(() => {
    const session = localStorage.getItem('appwriteSession');
    const userType = localStorage.getItem('userType');
    if (session && userType === 'Admin') {
      setIsAuthenticated(true);
      console.log("Authorized - User is admin.")
    } else {
      console.log("Not Authorized - User is not admin.")
      setIsAuthenticated(false);
      router.push('/');
    }
  }, [router]);

  const renderContent = () => {
    switch (activeTab) {
      case 'customerUsers':
        return <AdminCustomerUsers />;
      case 'serviceUsers':
        return <AdminServiceUsers />;
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/customer-login');
  };
  
  return (
    <div className="flex min-h-screen customer-background-profile">
      <aside className="w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Customer Users</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setActiveTab('customerUsers')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'customerUsers' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Customer Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('serviceUsers')}
                className={`w-full text-left py-2 px-4 mb-2 rounded ${activeTab === 'serviceUsers' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Service Users
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


export default AdminDashboard;