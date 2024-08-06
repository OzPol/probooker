import React, { useEffect, useState } from 'react';
import { ReviewCardProps } from '../types/appwrite.type';
import { fetchUserInfo } from './FunctionGetUserinfo';

const ReviewCardProviderProfile: React.FC<ReviewCardProps> = ({ serviceID, consumerID, providerID, review_text, review_date, rating, service_title }) => {
  const [consumer, setConsumer] = useState<any>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo(consumerID, "Consumer");
      setConsumer(userInfo);
    };

    getUserInfo();
  }, [consumerID]);

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

  if (!consumer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2 p-4">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold">Service: {service_title}</h3>
      </div>
      <div className="flex items-center mb-2">
        <img src={consumer.profileImg} alt={consumer.name} className="w-16 h-16 rounded-full mr-4" />
        <div className='flex w-full justify-between'>
          <p className="text-gray-600">By: {consumer.name} - {consumer.city}, {consumer.state}</p>
          <div className='flex '>
            {renderStars(rating)}
            <span className="ml-2 text-gray-500">{new Date(review_date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 pt-4">
        <p className="text-gray-700">{review_text}</p>
      </div>
    </div>
    
  );
};

export default ReviewCardProviderProfile;
