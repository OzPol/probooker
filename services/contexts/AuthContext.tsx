// contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { client, account } from '../lib/appwrite';

interface AuthContextType {
  user: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentSession = localStorage.getItem('appwriteSession');
        if (currentSession) {
          const session = JSON.parse(currentSession);
          // Ensure the client has the session ID set
          client.setJWT(session.$id);
          const response = await account.get();
          setUser(response.name);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        console.error('Failed to get user:', error);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
