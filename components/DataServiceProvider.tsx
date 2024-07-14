import { databases } from '../lib/appwrite.config'; // Adjust the import according to your setup
import { Service } from '../types'; // Ensure the path is correct

export const fetchAndFilterServices = async (): Promise<Service[]> => {
  const session = localStorage.getItem('appwriteSession');
  let services: Service[] = [];

  if (session) {
    const sessionData = JSON.parse(session);
    const userId = sessionData.userId; // Assuming the session data contains the userId

    try {
      // Fetch documents from Appwrite collection
      const response = await databases.listDocuments('DBID', 'SERVICE_COLLECTION_ID');//DB  Coll
      const allServices = response.documents;

      // Filter services based on providerId
      services = allServices
        .filter((doc: any) => doc.providerId === userId)
        .map((doc: any) => ({
          $id: doc.$id,
          name: doc.title, // Assuming the document has a field called 'title' that corresponds to 'name'
          description: doc.description,
          price: doc.price,
          providerId: doc.providerId,
          providerName: doc.serviceProvider, // Assuming 'serviceProvider' is the field name
        }));
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  }

  return services;
};
