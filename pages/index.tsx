// pages/index.tsx

import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <Head>
        <title>ProBooker</title>
        <meta name="description" content="ProBooker Service Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center py-8 w-full flex-1">
        <h1 className="text-4xl font-bold mb-2">ProBooker</h1>
        <h2 className="text-2xl mb-6">Connect with the pros, book with confidence</h2>

        <div className="w-full max-w-md flex flex-col items-center space-y-4">
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
      </main>
    </div>
  );
}
