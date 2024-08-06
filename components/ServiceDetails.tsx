import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import AvailabilityCalendar from './AvailabilityCalendar';
import { Service, ReviewCardProps } from '../types/appwrite.type';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { fetchReviewsForService } from './DataReviewConsumerView';

interface ServiceDetailsProps {
  service: Service;
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
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return sum / ratings.length;
};

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onBack }) => {
  const [availableDates, setAvailableDates] = useState<Date[]>([
    // Mocked available dates
    new Date('2024-07-25'),
    new Date('2024-07-26'),
    new Date('2024-07-27'),
  ]);
  const [isBookingSectionVisible, setIsBookingSectionVisible] = useState(false);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviews, setReviews] = useState<ReviewCardProps[]>([]);

  const toggleBookingSection = () => {
    setIsBookingSectionVisible(!isBookingSectionVisible);
  };

  const toggleReviewForm = () => {
    setIsReviewFormVisible(!isReviewFormVisible);
  };

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await fetchReviewsForService(service.$id);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [service.$id]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
      <div className="flex items-center mb-2">
        {renderStars(parseFloat(calculateAverageRating(service.ratings).toFixed(1)))}
        <span className="font-bold ml-4">{parseFloat(calculateAverageRating(service.ratings).toFixed(1))}</span>
        <span className="font-bold ml-4"> ({service.ratings.length} Reviews)</span>
      </div>
      <p className="text-gray-600 italic">Provider: {service.providerName}</p>
      <p className="text-gray-600 italic">{service.city}, {service.zipcode}</p>
      <p className="text-gray-700 mb-2">{service.description}</p>
      <p className="text-blue-500 font-bold">Price: ${service.price}</p>

      <div className="flex space-x-4">
        <button 
          onClick={toggleBookingSection} 
          className={`mt-4 py-2 px-4 rounded ${isBookingSectionVisible ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
          {isBookingSectionVisible ? 'Hide Booking' : 'Book'}
        </button>
        <button 
          onClick={toggleReviewForm} 
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">
          {isReviewFormVisible ? 'Cancel Review' : 'Write a Review'}
        </button>
        <button
          onClick={fetchReviews}
          className="mt-4 py-2 px-4 font-bold bg-gray-500 text-white rounded">
          ↻
        </button>
      </div>

      {isBookingSectionVisible && (
        <div className="bg-gray-100 rounded-lg p-6 mt-4">
          <h2 className="text-2xl font-bold mb-4">Booking: {service.name}</h2>
          <AvailabilityCalendar availableDates={availableDates} />
          <BookingForm />
        </div>
      )}

      {isReviewFormVisible && (
        <div className="bg-gray-100 rounded-lg p-6 mt-4">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <ReviewForm serviceID={service.$id} providerID={service.providerId} serviceTitle={service.name} />
        </div>
      )}

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

      <button onClick={onBack} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Back to Search</button>
    </div>
  );
};

export default ServiceDetails;
