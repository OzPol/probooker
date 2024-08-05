import { databases } from '../lib/appwrite.config';
import { Service } from '../types/appwrite.type';


export const fetchAllServices = async (): Promise<Service[]> => {
  let services: Service[] = [];

    try {
      const response = await databases.listDocuments(
        process.env.DATABASE_ID!, 
        process.env.SERVICE_COLLECTION_ID!
      );//DB  Coll
      const allServices = response.documents;

      services = allServices
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

  return services;
};
