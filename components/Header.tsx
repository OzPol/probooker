// components/Header.tsx

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { account } from '../lib/appwrite.config';
import { logout } from '../lib/authUtils';

const Header: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      // Retrieve session info from local storage
      const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
      const type = localStorage.getItem('userType');
      if (session && session.userId && type) {
        setIsLoggedIn(true);
        setUserType(type);
        console.log('Logged in.');
      } else {
        setIsLoggedIn(false);
        setUserType(null);
        console.log('Not logged in.');
      }
    } catch (error) {
      console.error('Error checking login status', error);
      setIsLoggedIn(false);
      setUserType(null);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setUserType(null);
      router.push('/');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  const dashboardLink = userType === 'Customer' ? '/customerProfile' : '/serviceProfile';

  return (
    <header className="flex justify-between items-center bg-blue-500 p-4 w-full">
      <h1 className="text-xl font-bold text-white">ProBooker</h1>
      <nav className="flex space-x-4">
        <Link href="/" legacyBehavior>
          <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Home</a>
        </Link>
        <Link href="/services" legacyBehavior>
          <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">View Services</a>
        </Link>
        {!isLoggedIn ? (
          <>
            <Link href="/provider-login" legacyBehavior>
              <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Service Provider Log In</a>
            </Link>
            <Link href="/customer-login" legacyBehavior>
              <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Customer Log In</a>
            </Link>
          </>
        ) : (
          <>
            <Link href={dashboardLink} legacyBehavior>
              <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Dashboard</a>
            </Link>
            <button
              className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
