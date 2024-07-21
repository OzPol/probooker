// The Layout component specifies common features of every page like the header and the footer

// components/Layout.tsx
import Link from 'next/link';
import { useEffect, useState, ReactNode } from 'react';
import { databases, DATABASE_ID,CONSUMER_COLLECTION_ID} from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve session info from local storage
        const session = JSON.parse(localStorage.getItem('appwriteSession') || '{}');
        
        if (!session || !session.userId) {
          setMessage('No active session found. Please log in.');
          return;
        }

        // Fetch user profile from user collection
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!, 
          process.env.CONSUMER_COLLECTION_ID!, 
          [ 
            sdk.Query.equal('userId', session.userId)
          ]
        );

        if (response.documents.length > 0) {
          setProfile(response.documents[0]);
        } else {
          setMessage('Profile not found.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage('Error fetching profile.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <header className="flex justify-between items-center bg-blue-500 p-4">
        <h1 className="text-xl font-bold text-white">ProBooker</h1>
        <nav className="flex space-x-4">
          <Link href="/" legacyBehavior>
            <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Home</a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">View Services</a>
          </Link>
          <Link href="/providerlogin" legacyBehavior>
            <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Service Provider Log In</a>
          </Link>
          {profile ? (
            <span className="bg-white text-blue-500 py-2 px-4 rounded">
              Welcome, {profile.name}!
            </span>
          ) : (<p></p>)}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
