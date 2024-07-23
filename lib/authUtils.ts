// lib/authUtils.ts
import { account } from './appwrite.config';

export const logout = async () => {
    try {
    //    await account.deleteSession('current');
        localStorage.removeItem('appwriteSession');
        localStorage.removeItem('userType');
        localStorage.setItem('isLoggedIn', 'false'); // Added to refresh the header on login/logout
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
