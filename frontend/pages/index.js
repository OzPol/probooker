import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginForm from '../components/LoginForm';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    console.log('useEffect called');
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        setUsername(decodedToken.username);
        setLoggedIn(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        setLoggedIn(false);
      }
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Welcome, {username}</h1>
          <p>Search for Service Providers</p>
          {/* Implement search functionality here */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please Log In</h1>
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default HomePage;
