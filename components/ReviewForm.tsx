import React, { useState, useEffect } from 'react';
import { databases } from '../lib/appwrite.config';
import StarRating from './ReviewStarSelection';
import * as sdk from 'node-appwrite';

interface ReviewFormProps {
  serviceID: string;
  providerID: string;
  serviceTitle: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ serviceID, providerID, serviceTitle }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [consumerDocID, setConsumerDocID] = useState<string>('');
  const [providerDocID, setProviderDocID] = useState<string>('');

  useEffect(() => {
    const fetchConsumerDocID = async () => {
      const session = localStorage.getItem('appwriteSession');
      if (session) {
        const sessionData = JSON.parse(session);
        try {
          const response = await databases.listDocuments(
            process.env.DATABASE_ID!,
            process.env.CONSUMER_COLLECTION_ID!,
            [sdk.Query.equal('userId', sessionData.userId)]
          );

          if (response.documents.length > 0) {
            setConsumerDocID(response.documents[0].$id);
          } else {
            setMessage('Consumer not found.');
          }
        } catch (error) {
          console.error('Error fetching consumer document ID:', error);
          setMessage('Error fetching consumer information.');
        }
      }
    };

    const fetchProviderDocID = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          process.env.SERVICEPROVIDER_COLLECTION_ID!,
          [sdk.Query.equal('userId', providerID)]
        );

        if (response.documents.length > 0) {
          setProviderDocID(response.documents[0].$id);
        } else {
          setMessage('Provider not found.');
        }
      } catch (error) {
        console.error('Error fetching provider document ID:', error);
        setMessage('Error fetching provider information.');
      }
    };

    fetchConsumerDocID();
    fetchProviderDocID();
  }, [providerID]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consumerDocID || !providerDocID) {
      setMessage('Consumer or provider information not available.');
      return;
    }

    try {
      const reviewDate = new Date().toISOString();

      const reviewResponse = await databases.createDocument(
        process.env.DATABASE_ID!,
        process.env.REVIEW_COLLECTION_ID!,
        'unique()',
        {
          consumerID: consumerDocID,
          serviceID,
          service_title: serviceTitle,
          review_text: reviewText,
          review_date: reviewDate,
          rating,
          providerID: providerDocID,
        }
      );

      // Update the service document with the new review ID and rating
      const serviceResponse = await databases.getDocument(
        process.env.DATABASE_ID!,
        process.env.SERVICE_COLLECTION_ID!,
        serviceID
      );

      const updatedReviews = [...serviceResponse.reviews, reviewResponse.$id];
      const updatedRatings = [...serviceResponse.ratings, rating];

      await databases.updateDocument(
        process.env.DATABASE_ID!,
        process.env.SERVICE_COLLECTION_ID!,
        serviceID,
        {
          reviews: updatedReviews,
          ratings: updatedRatings,
        }
      );

      // Update the provider document with the new rating
      const providerResponse = await databases.getDocument(
        process.env.DATABASE_ID!,
        process.env.SERVICEPROVIDER_COLLECTION_ID!,
        providerDocID
      );

      const providerUpdatedRatings = [...providerResponse.ratings, rating];

      await databases.updateDocument(
        process.env.DATABASE_ID!,
        process.env.SERVICEPROVIDER_COLLECTION_ID!,
        providerDocID,
        {
          ratings: providerUpdatedRatings,
        }
      );

      setMessage('Review submitted successfully');
      clearFormFields();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      setMessage('Error submitting review. Please try again.');
    }
  };

  const clearFormFields = () => {
    setReviewText('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="rating" className="font-semibold">Rating:</label>
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="reviewText" className="font-semibold">Review:</label>
        <textarea 
          id="reviewText" 
          value={reviewText} 
          onChange={(e) => setReviewText(e.target.value)} 
          required 
          className="border border-gray-300 rounded p-1 mt-1"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit Review
      </button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
};

export default ReviewForm;
