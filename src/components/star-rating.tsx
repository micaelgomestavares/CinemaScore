import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, className }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    onRatingChange(index);
  };

  const renderStar = (index: number) => {
    const filled = hoverRating ? hoverRating : rating;
    const isFullStar = filled >= index;
    const isHalfStar = filled >= index - 0.5 && filled < index;

    return (
      <div
        key={index}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(index)}
        className={`cursor-pointer ${className}`}
      >
        {isFullStar ? (
          <FaStar className="text-yellow-500 w-5 h-5" />
        ) : isHalfStar ? (
          <FaStarHalfAlt className="text-yellow-500 w-5 h-5" />
        ) : (
          <FaRegStar className="text-gray-300 w-5 h-5" />
        )}
      </div>
    );
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => renderStar(index + 1))}
    </div>
  );
};

export default StarRating;
