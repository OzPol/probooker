import { databases } from '../lib/appwrite.config';
import { Service } from '../types/appwrite.type';


export const fetchAllServices = async (): Promise<Service[]> => {
  const session = localStorage.getItem('appwriteSession');
  let services: Service[] = [];

  if (session) {
    const sessionData = JSON.parse(session);
    const userId = sessionData.userId;

    try {
      // Fetch documents from Appwrite collection
      const response = await databases.listDocuments('DATABASE_ID', 'SERVICE_COLLECTION_ID');//DB  Coll
      const allServices = response.documents;

      // Filter services based on providerId
      services = allServices
        .map((doc: any) => ({
          $id: doc.$id,
          name: doc.title,
          description: doc.description,
          price: doc.price,
          providerId: doc.providerId,
          providerName: doc.serviceProvider,
        }));
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }

  return services;
};
