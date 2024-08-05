import { databases } from '../lib/appwrite.config';
import { Service } from '../types/appwrite.type';


export const fetchAndFilterServices = async (): Promise<Service[]> => {
  const session = localStorage.getItem('appwriteSession');
  let services: Service[] = [];

  if (session) {
    const sessionData = JSON.parse(session);
    const userId = sessionData.userId;

    try {
      // Fetch documents from Appwrite collection
      const response = await databases.listDocuments(
        process.env.DATABASE_ID!, 
        process.env.SERVICE_COLLECTION_ID!
      );//DB  Coll
      const allServices = response.documents;

      // Filter services based on providerId
      services = allServices
        .filter((doc: any) => doc.providerId === userId)
        .map((doc: any) => ({
          $id: doc.$id,
          name: doc.title,
          summary:doc.summary,
          description: doc.description,
          price: doc.price,
          providerId: doc.providerId,
          providerName: doc.serviceProvider,
          category: doc.category,
          ratings: doc.ratings,
          reviews:doc.reviews,
          address: doc.address,
          city:doc.city,
          zipcode:doc.zipcode,
        }));
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }

  return services;
};
