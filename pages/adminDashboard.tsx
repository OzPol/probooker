import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
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
  
  return (
    <div>
      <h1>Welcome to the Admin Dashboard!</h1>
      {/* Admin dashboard content */}
    </div>
  );
};


export default AdminDashboard;