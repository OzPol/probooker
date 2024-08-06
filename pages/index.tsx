// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { account } from '../lib/appwrite.config';

export default function Home() {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
        const type = localStorage.getItem('userType');

        if (session && type) {
          setUserType(type);
        } else {
          setUserType(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      localStorage.removeItem('appwriteSession');
      localStorage.removeItem('userType');
      router.push('/customer-login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-[81vh] flex flex-col justify-center items-center homepage-background">
      <Head>
        <title>ProBooker</title>
        <meta name="description" content="ProBooker Service Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative z-10 flex flex-col md:flex-row justify-center items-center py-8 w-full flex-1">
        {userType ? (
          <div className="flex flex-col items-center space-y-4 p-8 bg-white bg-opacity-80 rounded-md shadow-lg md:w-3/2">
            <h1 className="text-4xl font-bold mb-2">Welcome, {userType}</h1>
            {userType === 'Customer' && (
              <>
                <p>Customer-specific content here.</p>
                {/* Add other customer-specific components or content */}
              </>
            )}
            {userType === 'Provider' && (
              <>
                <p>Provider-specific content here.</p>
                {/* Add other provider-specific components or content */}
              </>
            )}
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 p-8 bg-white bg-opacity-80 rounded-md shadow-lg md:w-3/2">
            <h1 className="text-4xl font-bold mb-2">ProBooker</h1>
            <h2 className="text-2xl mb-6">Connect with the pros, book with confidence</h2>
            <Link href="/customer-start" legacyBehavior>
              <a className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-600">
                Get Started as a Customer
              </a>
            </Link>
            <Link href="/provider-start" legacyBehavior>
              <a className="w-full bg-green-500 text-white py-3 px-6 rounded-lg text-center hover:bg-green-600">
                Join as a Pro
              </a>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
