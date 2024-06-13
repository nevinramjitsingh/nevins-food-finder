import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i}>&#9733;</span>); // filled star
    } else {
      stars.push(<span key={i}>&#9734;</span>); // empty star
    }
  }

  return <div>{stars}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
