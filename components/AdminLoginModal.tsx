'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { account } from '../lib/appwrite.config';
interface AdminLoginModalProps {
  show: boolean;
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ show, onClose }) => {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
        const currentSession = localStorage.getItem('appwriteSession');
        if (currentSession) {
          localStorage.removeItem('appwriteSession');
        }
        // Logging in
        const session = await account.createEmailPasswordSession('admin@probooker.com', password);
        localStorage.setItem('appwriteSession', JSON.stringify(session));
        localStorage.setItem('userType', 'Admin'); // Store user type
        localStorage.setItem('isLoggedIn', 'true'); // Added to refresh the header on login
        window.dispatchEvent(new Event('storage')); // Added to refresh the header on login
        router.push('/adminDashboard');
      } catch (error: any) {
        console.error('Error logging in:', error);
      }
    };

  if (!show) {
    return null;
  }

  return (
    <div className="admin-login-modal">
      <div className="modal-content">
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClose}>Close</button>
      </div>
      <style jsx>{`
        .admin-login-modal {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border: 1px solid #ccc;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        input {
          margin-bottom: 10px;
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          margin-right: 10px;
          padding: 8px 12px;
          border: none;
          background: #0070f3;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        button:last-child {
          background: #ccc;
        }
      `}</style>
    </div>
  );
};

export default AdminLoginModal;
