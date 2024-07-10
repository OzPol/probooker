'use client'

import { useState, ChangeEvent, FormEvent } from 'react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle registration logic
    console.log('Register Form Data:', formData);
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
      <input
        type="password"
        name="confirmPassword"
        placeholder="Choose a Passowrd"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        aria-label="Confirm Password"
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Register
      </button>
      <button
        type="button"
        className="w-full mt-2 text-blue-500 underline"
        onClick={onSwitchToLogin}
      >
        Log In
      </button>
    </form>
  );
};

export default RegisterForm;
