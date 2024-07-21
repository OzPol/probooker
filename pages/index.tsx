// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center homepage-background">
      <Head>
        <title>ProBooker</title>
        <meta name="description" content="ProBooker Service Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative z-10 flex flex-col md:flex-row justify-center items-center py-8 w-full flex-1">
        <div className="flex flex-col items-center space-y-4 p-8 bg-white bg-opacity-80 rounded-md shadow-lg md:w-1/2">
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
      </main>
    </div>
  );
}
