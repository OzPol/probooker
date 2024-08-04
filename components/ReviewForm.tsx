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
      console.log(consumerDocID);
    };

    fetchConsumerDocID();
  }, []);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consumerDocID) {
      setMessage('Consumer information not available.');
      return;
    }

    try {
      const reviewDate = new Date().toISOString();

      await databases.createDocument(
        process.env.DATABASE_ID!,
        process.env.REVIEW_COLLECTION_ID!,
        'unique()',
        {
          consumerID: consumerDocID,
          serviceID,
          review_text: reviewText,
          review_date: reviewDate,
          rating,
          providerID,
          service_title:serviceTitle,
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
