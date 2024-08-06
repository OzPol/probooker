import React, { useEffect, useState } from 'react';
import { databases } from '../lib/appwrite.config';

interface User {
  $id: string;
  name?: string;
  email?: string;
  // Add more fields as necessary
}

interface UserTableProps {
  collectionId: string;
}

const ShowCollection: React.FC<UserTableProps> = ({ collectionId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCollection = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');

        if (!session || !session.userId) {
          console.log('No active session found. Please log in.');
          return;
        }

        // Fetch data from collection
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          collectionId,
        );
        setUsers(response.documents);
      } catch (error) {
        console.error('Error fetching users:');
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.$id}>
              <td>{user.$id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* Add more fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default ShowCollection;
