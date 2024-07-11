import Head from 'next/head';
import { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in:', { username, password });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <Head>
        <title>Provider Login - ProBooker</title>
        <meta name="description" content="Service Provider Login Page" />
      </Head>
      <h1 className="text-4xl font-bold mb-8">Provider Login</h1>
      <form onSubmit={handleLogin} className="bg-gray-100 p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
