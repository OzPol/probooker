import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>ProBooker</title>
        <meta name="description" content="ProBooker Service Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center bg-blue-500 p-4">
        <h1 className="text-xl font-bold text-white">ProBooker</h1>
        <a href="/login">
          <button className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">
            Service Provider Log In
          </button>
        </a>
      </header>

      <main className="flex flex-col justify-center items-center py-8 w-full flex-1">
        <h1 className="text-4xl font-bold mb-2">ProBooker</h1>
        <h2 className="text-2xl mb-6">
          Connect with the pros, book with confidence
        </h2>

        <div className="w-full max-w-sm">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded mb-4">
            Log In
          </button>
          <a
            href="/register"
            className="text-blue-500 underline text-center block"
          >
            Register
          </a>
        </div>
      </main>
    </div>
  );
}
