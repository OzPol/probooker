//this function uses USER **DOCUMENT** ID (NOT auth USER ID) to retrieve a user document 
//parameter: userDocument ID;  userType



import { databases } from '../lib/appwrite.config';
import { Models } from 'node-appwrite';

const USER_TYPES = {
  CONSUMER: 'Consumer',
  PROVIDER: 'Provider'
};

export const fetchUserInfo = async (userId: string, userType: string): Promise<Models.Document | null> => {
  let collectionId;

  if (userType === USER_TYPES.CONSUMER) {
    collectionId = process.env.CONSUMER_COLLECTION_ID!;
  } else if (userType === USER_TYPES.PROVIDER) {
    collectionId = process.env.SERVICEPROVIDER_COLLECTION_ID!;
  } else {
    throw new Error('Invalid user type');
  }

  try {
    const response = await databases.getDocument(
      process.env.DATABASE_ID!,
      collectionId,
      userId
    );

    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};
