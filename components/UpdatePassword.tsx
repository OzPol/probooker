// components/ChangePasswordForm.tsx

import React, { useState } from 'react';
import { users } from '../lib/appwrite.config';

const ChangePasswordForm: React.FC<{ userId: string }> = ({ userId }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }
    try {
      await users.updatePassword(userId, newPassword);
      setMessage("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Error updating password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="oldPassword" className="">
          Old Password:
        </label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="newPassword" className="">
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className="">
          Confirm New Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-2 rounded hover:bg-blue-600">
        Update Password
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default ChangePasswordForm;
