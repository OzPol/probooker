import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';

const HomePage = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <div>
            {loggedIn ? (
                <div>
                    <h1>Search for Service Providers</h1>
                    {/* Implement search functionality here */}
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
