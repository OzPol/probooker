// components/Header.tsx

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { account } from '../lib/appwrite.config';

const Header: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      try {
        const user = await account.get();
        setIsLoggedIn(true);
        setUserType(user.prefs.userType);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await account.deleteSession('current');
    setIsLoggedIn(false);
    router.push('/');
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
        {!isLoggedIn && (
          <>
            <Link href="/provider-login" legacyBehavior>
              <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Service Provider Log In</a>
            </Link>
            <Link href="/customer-login" legacyBehavior>
              <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Customer Log In</a>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            {userType === 'Provider' && (
              <Link href="/provider-dashboard" legacyBehavior>
                <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Dashboard</a>
              </Link>
            )}
            {userType === 'Consumer' && (
              <Link href="/customer-dashboard" legacyBehavior>
                <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Dashboard</a>
              </Link>
            )}
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
