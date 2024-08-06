import { databases } from '../lib/appwrite.config';
import { ReviewCardProps } from '../types/appwrite.type';

export const fetchAndFilterReviews = async (): Promise<ReviewCardProps[]> => {
  const session = localStorage.getItem('appwriteSession');
  let reviews: ReviewCardProps[] = [];

  if (session) {
    const sessionData = JSON.parse(session);
    const userId = sessionData.userId;

    try {
      const response = await databases.listDocuments(
        process.env.DATABASE_ID!,
        process.env.REVIEW_COLLECTION_ID!
      );
      const allReviews = response.documents;

      reviews = allReviews
        .filter((doc: any) => doc.providerID === userId || doc.consumerID === userId)
        .map((doc: any) => ({
          serviceID: doc.serviceID,
          consumerID: doc.consumerID,
          providerID: doc.providerID,
          review_text: doc.review_text,
          review_date: new Date(doc.review_date),
          rating: doc.rating,
        }));
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  return reviews;
};
