// components/LoginFormProvider.tsx

'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { account } from '../lib/appwrite.config';
import { useRouter } from 'next/router';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginFormProvider: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const currentSession = localStorage.getItem('appwriteSession');
      if (currentSession) {
        localStorage.removeItem('appwriteSession');
      }
      // Logging in
      const session = await account.createEmailPasswordSession(formData.email, formData.password);
      localStorage.setItem('appwriteSession', JSON.stringify(session));
      localStorage.setItem('userType', 'Provider'); // Store user type
      setMessage('Login successful');
      setMessageType('success');
      router.push('/serviceProfile');
    } catch (error: any) {
      console.error('Error logging in:', error);
      setMessage('Error logging in. Please check your credentials and try again.');
      setMessageType('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={formData.email}
        onChange={handleChange}
        required
        aria-label="Email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={formData.password}
        onChange={handleChange}
        required
        aria-label="Password"
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Log In
      </button>
      {message && (
        <p className={`mt-2 ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
      <button
        type="button"
        className="w-full mt-2 text-blue-500 underline"
        onClick={onSwitchToRegister}
      >
        Register
      </button>
    </form>
  );
};

export default LoginFormProvider;
