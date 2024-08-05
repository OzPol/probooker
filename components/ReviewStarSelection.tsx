import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index: number) => {
    onRatingChange(index);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= (hoveredRating || rating) ? '/assets/star-full.svg' : '/assets/star-null.svg'}
          alt={i <= (hoveredRating || rating) ? 'Full Star' : 'Empty Star'}
          className="w-6 h-6 cursor-pointer"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        />
      );
    }
    return stars;
  };

  return <div className="flex space-x-1">{renderStars()}</div>;
};

export default StarRating;
