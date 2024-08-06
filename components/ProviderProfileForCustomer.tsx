import React, { useEffect, useState } from 'react';
import { databases } from '../lib/appwrite.config';
import * as sdk from 'node-appwrite';
import { ReviewCardProps } from '../types/appwrite.type';
import ReviewCard from './ReviewCard';
import { fetchReviewsForProvider } from './DataReviewProviderProfilePage';

interface ProviderProfileForCustomerProps {
  providerId: string;
  onBack: () => void;
}

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= i + 0.8) {
      stars.push(
        <img key={i} src="/assets/star-full.svg" alt="Full Star" className="w-6 h-6" />
      );
    } else if (rating >= i + 0.3) {
      stars.push(
        <img key={i} src="/assets/star-half.svg" alt="Half Star" className="w-6 h-6" />
      );
    } else {
      stars.push(
        <img key={i} src="/assets/star-null.svg" alt="Empty Star" className="w-6 h-6" />
      );
    }
  }
  return stars;
};

const calculateAverageRating = (ratings: number[]): number => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return sum / ratings.length;
};

const ProviderProfileForCustomer: React.FC<ProviderProfileForCustomerProps> = ({ providerId, onBack }) => {
  const [profile, setProfile] = useState<any>(null);
  const [reviews, setReviews] = useState<ReviewCardProps[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfileAndReviews = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.DATABASE_ID!,
          process.env.SERVICEPROVIDER_COLLECTION_ID!,
          [sdk.Query.equal('userId', providerId)]
        );

        if (response.documents.length > 0) {
          const userProfile = response.documents[0];
          setProfile(userProfile);

          // Fetch reviews using the provider document ID
          const fetchedReviews = await fetchReviewsForProvider(userProfile.$id);
          setReviews(fetchedReviews);
        } else {
          setMessage('Profile not found.');
        }
      } catch (error) {
        console.error('Error fetching profile and reviews:', error);
        setMessage('Error fetching profile and reviews.');
      }
    };

    fetchProfileAndReviews();
  }, [providerId]);

  return (
    <div className="bg-gray-100 rounded-lg p-6">
      <button onClick={onBack} className="mb-4 bg-blue-500 text-white py-2 px-4 rounded">Back</button>
      <h1 className="font-bold text-3xl">Provider Profile</h1>
      {message && <p className="text-red-500">{message}</p>}
      {profile && (
        <>
          <div className="flex justify-between items-start mb-4 border-b border-gray-300 pb-4">            
            <div className="flex items-center">
              <div className="w-40 h-40 flex items-center justify-center rounded-full">
                <img className="w-32 h-32 rounded-full" src={profile.profileImg} alt={profile.name} />
              </div>
              <div className="mx-6">
                <h2 className="font-bold text-lg">{profile.name}</h2>
                <p>{profile.city}, {profile.state}</p>
                <p className="flex">
                  {renderStars(parseFloat(calculateAverageRating(profile.ratings || []).toFixed(1)))} 
                  <span className='font-bold'>{parseFloat(calculateAverageRating(profile.ratings || []).toFixed(1))}</span>, ({profile.ratings?.length || 0} Reviews)
                </p>
                <p>Joined On: {profile.createdAt?.substring(0, 10)}</p>
              </div>
            </div>
            <div className="w-5/12 items-center justify-center mt-10">
              <h3><span className="label mt-1">Phone:</span>{profile.phone}</h3>
              <h3><span className="label">e-mail:</span>{profile.email}</h3>
              <h3><span className="label">Address:</span>{profile.address}</h3>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold mb-4">Reviews</h3>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))
            ) : (
              <p>No reviews found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProviderProfileForCustomer;
