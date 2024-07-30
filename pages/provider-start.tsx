// provider-start.tsx pages to guide users to either register or log in.

import Head from 'next/head';
import Link from 'next/link';

export default function ProviderStart() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <Head>
        <title>Join as a Pro</title>
        <meta name="description" content="Provider start page for ProBooker" />
      </Head>
      
      <main className="flex flex-col justify-center items-center py-8 w-full flex-1">
        <h1 className="text-4xl font-bold mb-2">Join as a Pro</h1>
        <h2 className="text-2xl mb-6">Become a provider and offer your services</h2>

        <div className="w-full max-w-md flex flex-col items-center space-y-4">
          <Link href="/provider-register" legacyBehavior>
            <a className="w-full bg-green-500 text-white py-3 px-6 rounded-lg text-center hover:bg-green-600">
              Register
            </a>
          </Link>
          <Link href="/provider-login" legacyBehavior>
            <a className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-600">
              Log In
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
