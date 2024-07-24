import { useState, useEffect } from 'react';
import { account } from '../lib/appwrite.config';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      // Log in the user
      const session = await account.createEmailPasswordSession(formData.email, formData.password);
      // Fetch the logged-in user's account information
      const user = await account.get();
      setUserName(user.name);
      localStorage.setItem('appwriteSession', JSON.stringify(session));
      localStorage.setItem('isLoggedIn', 'true');
      window.dispatchEvent(new Event('storage'));
      setMessage('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in. Please check your credentials and try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUserName(null);
      localStorage.setItem('isLoggedIn', 'false');
      window.dispatchEvent(new Event('storage'));
      setMessage('Logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error);
      setMessage('Error logging out. Please try again.');
    }
  };

  const checkAuth = async () => {
    try {
      const user = await account.get();
      setUserName(user.name);
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {!userName ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Log In
            </button>
          </form>
        ) : (
          <p className="mt-4 text-sm text-green-500">Welcome, {userName}!</p>
        )}
        <button
          onClick={handleLogout}
          className={`w-full bg-red-500 text-white py-2 mt-4 rounded hover:bg-red-600 ${!userName ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!userName}
        >
          Log Out
        </button>
        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
