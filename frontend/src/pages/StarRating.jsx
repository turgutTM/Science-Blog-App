import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ totalStars = 5, onRate }) => {
  const [hovered, setHovered] = useState(null);
  const [rating, setRating] = useState(null);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (index) => {
    setRating(index);
    onRate(index);
  };

  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) => (
        <FaStar
          key={index}
          size={24}
          style={{
            cursor: "pointer",
            color: index < (hovered || rating) ? "black" : "#ffeeb4",
          }}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
