import { databases } from '../lib/appwrite.config';
import { ReviewCardProps } from '../types/appwrite.type';
import * as sdk from 'node-appwrite';

export const fetchReviewsForProvider = async (providerDocID: string): Promise<ReviewCardProps[]> => {
  let reviews: ReviewCardProps[] = [];

  if (!providerDocID) {
    console.error('Invalid provider document ID: ', providerDocID);
    return reviews;
  }

  try {
    const response = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.REVIEW_COLLECTION_ID!,
      [sdk.Query.equal('providerID', providerDocID)]
    );
    const allReviews = response.documents;

    reviews = allReviews.map((doc: any) => ({
      serviceID: doc.serviceID,
      consumerID: doc.consumerID,
      providerID: doc.providerID,
      review_text: doc.review_text,
      review_date: new Date(doc.review_date),
      rating: doc.rating,
      service_title: doc.service_title,
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }

  return reviews;
};
