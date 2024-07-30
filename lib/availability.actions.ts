import { databases } from './appwrite.config';
import { Query } from 'node-appwrite';

export const fetchProviderAvailability = async (providerId: string) => {
  const response = await databases.listDocuments(
    process.env.DATABASE_ID!,
    process.env.AVAILABILITY_COLLECTION_ID!,
    [Query.equal('providerId', providerId)]
  );
  if (response.documents.length > 0) {
    return response.documents[0].availableDates; // Adjust based on your document structure
  }
  return [];
};

export const updateProviderAvailability = async (providerId: string, availableDates: string[]) => {
  const response = await databases.listDocuments(
    process.env.DATABASE_ID!,
    process.env.AVAILABILITY_COLLECTION_ID!,
    [Query.equal('providerId', providerId)]
  );
  if (response.documents.length > 0) {
    await databases.updateDocument(
      process.env.DATABASE_ID!,
      process.env.AVAILABILITY_COLLECTION_ID!,
      response.documents[0].$id,
      { availableDates }
    );
  } else {
    await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.AVAILABILITY_COLLECTION_ID!,
      'unique()',
      { providerId, availableDates }
    );
  }
};
