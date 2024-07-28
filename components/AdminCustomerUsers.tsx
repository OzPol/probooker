import { useEffect, useState } from 'react';
import { databases} from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';

const AdminCustomerUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Retrieve session info from local storage
        const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
        
        if (!session || !session.userId) {
          console.log('No active session found. Please log in.');
          return;
        }

        // Fetch user profile from user collection
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!, 
          process.env.CONSUMER_COLLECTION_ID!,
        );

        setUsers(response.documents);
      } catch (error) {
        console.error('Error fetching users:', error);

       
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
        th, td {
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

export default AdminCustomerUsers;
