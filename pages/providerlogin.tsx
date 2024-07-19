

'use client';
import Head from 'next/head';
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setMessage(''); // Clear previous message
      try {
          const currentSession = localStorage.getItem('appwriteSession');
          if (currentSession) {
            const session = JSON.parse(currentSession);
            //await account.deleteSession(session.$id);
            localStorage.removeItem('appwriteSession');
          }
          // Logging in
          const session = await account.createEmailPasswordSession(formData.email, formData.password);
          //console.log('Login successful:', session);
          setMessage('Login successful');
          localStorage.setItem('appwriteSession', JSON.stringify(session));
          router.push('/serviceProfile');
          } catch (error:any) {
          console.error('Error logging in:', error);
          console.log(error.code+":"+error.type);
          setMessage('Error logging in. Please check your credentials and try again.');
          }
    };
    const handleGoBack = () => {
      router.push('/providerRegister');
    };
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <Head>
        <title>Provider Login - ProBooker</title>
        <meta name="description" content="Service Provider Login Page" />
      </Head>
      <h1 className="text-4xl font-bold mb-8">Provider Login</h1>
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
      {message && <p className="mt-2 text-red-500">{message}</p>}
      <button
        type="button"
        className="w-full mt-2 text-blue-500 underline"
        onClick={handleGoBack}
      >
        Register
      </button>
    </form>
    </div>
  );
};

export default LoginFormProvider;

