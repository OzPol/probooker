// pages/customerlogin.tsx

import LoginForm from '../components/LoginForm';

export default function CustomerLogin() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Customer Login</h1>
      <LoginForm onSwitchToRegister={() => window.location.href = '/customer-register'} />
    </div>
  );
}
