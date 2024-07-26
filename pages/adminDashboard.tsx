
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Client, Account } from 'appwrite';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const client = new Client();
    client.setEndpoint('https://[YOUR_APPWRITE_ENDPOINT]').setProject('[YOUR_PROJECT_ID]');

    const account = new Account(client);

    account.get().then(
      (response) => {
        if (response.$id !== '[ADMIN_USER_ID]') {
          router.push('/login');
        }
      },
      (error) => {
        router.push('/login');
      }
    );
  }, [router]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin dashboard content */}
    </div>
  );
};

export default AdminDashboard;
