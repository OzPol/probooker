import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);

  const switchToRegister = () => setShowRegister(true);
  const switchToLogin = () => setShowRegister(false);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>ProBooker</title>
        <meta name="description" content="ProBooker Service Marketplace" />
        <link rel="icon" href="../../app/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center bg-blue-500 p-4">
        <h1 className="text-xl font-bold text-white">ProBooker</h1>
        <nav className="flex space-x-4">
          <Link href="/" legacyBehavior>
            <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Home</a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">View Services</a>
          </Link>
          <Link href="/providerlogin" legacyBehavior>
            <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Service Provider Log In</a>
          </Link>
        </nav>
      </header>

      <main className="flex flex-col justify-center items-center py-8 w-full flex-1">
        <h1 className="text-4xl font-bold mb-2">ProBooker</h1>
        <h2 className="text-2xl mb-6">Connect with the pros, book with confidence</h2>

        <div className="w-full max-w-sm">
          {showRegister ? (
            <RegisterForm onSwitchToLogin={switchToLogin} />
          ) : (
            <LoginForm onSwitchToRegister={switchToRegister} />
          )}
        </div>
      </main>
    </div>
  );
}
