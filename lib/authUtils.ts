// lib/authUtils.ts
import { account } from './appwrite.config';

export const logout = async () => {
    try {
    //    await account.deleteSession('current');
        localStorage.removeItem('appwriteSession');
        localStorage.removeItem('userType');
    } catch (error) {
        console.error('Error logging out:', error);
    }
};
