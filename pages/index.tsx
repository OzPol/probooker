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
