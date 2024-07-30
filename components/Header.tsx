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

  const checkAuth = async () => {
    try {
      // Retrieve session info from local storage
      const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
      if (session && session.userId) {
        setIsLoggedIn(true);
        console.log('Logged in.');
      } else {
        setIsLoggedIn(false);
        console.log('Not logged in.');
      }
    } catch (error) {
      console.error('Error checking login status', error);
      setIsLoggedIn(false);
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
      router.push('/');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

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
