import React, { useEffect, useState } from 'react';
import { ReviewCardProps } from '../types/appwrite.type';
import { fetchUserInfo } from './FunctionGetUserinfo';

const ReviewCardConsumerSelf: React.FC<ReviewCardProps> = ({ serviceID, consumerID, providerID, review_text, review_date, rating, service_title }) => {
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo(providerID, "Provider");
      setProvider(userInfo);
    };
    console.log(providerID);
    getUserInfo();
  }, [providerID]);

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

  if (!provider) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2 p-4">
      <div className="flex items-center mb-4">
        <div>
          <h3 className="text-lg font-bold">{service_title}</h3>
          <span className="text-gray-600">By: {provider.name} - {provider.city}, {provider.state}</span>
        </div>
      </div>
      <div className="flex items-center mb-2">
        {renderStars(rating)}
        <span className="ml-2 text-gray-500">{new Date(review_date).toLocaleDateString()}</span>
      </div>
      <div className="border-t border-gray-300 pt-4">
        <p className="text-gray-700">{review_text}</p>
      </div>
    </div>
  );
};

export default ReviewCardConsumerSelf;
