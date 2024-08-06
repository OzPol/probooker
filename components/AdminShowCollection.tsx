import React, { useEffect, useState } from 'react';
import { databases } from '../lib/appwrite.config';
import { Query } from 'appwrite';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const documentsPerPage = 50;

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true); // Set loading to true when starting a new fetch
      try {
        const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');

        if (!session || !session.userId) {
          console.log('No active session found. Please log in.');
          return;
        }

        // Calculate the offset based on the current page
        const offset = (currentPage - 1) * documentsPerPage;

        console.log(`Fetching page ${currentPage} with offset ${offset}`);

        // Fetch data from the collection with pagination
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          collectionId,
          [
            Query.limit(documentsPerPage),
            Query.offset(offset)
          ]
        );

        console.log('Fetched users:', response.documents);

        setUsers(response.documents);
        setTotalDocuments(response.total); // Set total documents for pagination
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchCollection();
  }, [collectionId, currentPage]); // Re-fetch data when collectionId or currentPage changes

  const totalPages = Math.ceil(totalDocuments / documentsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

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
        .pagination {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        button {
          padding: 8px 16px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:disabled {
          background-color: #ddd;
          cursor: not-allowed;
        }
        span {
          margin: 0 10px;
        }
      `}</style>
    </div>
  );
};

export default ShowCollection;
