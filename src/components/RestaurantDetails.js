import React from 'react';
import Map from './Map';
import StarRating from './StarRating';
import PropTypes from 'prop-types';

const RestaurantDetails = ({ restaurant, userLocation }) => {
  const { name, location, rating, review_count, url, coordinates, categories } = restaurant;

  return (
    <div className="restaurant-details">
      <h2>{name}</h2>
      <p>{location.address1}</p>
      <p>{location.city}, {location.state} {location.zip_code}</p>
      <StarRating rating={rating} />
      <p>Review Count: {review_count}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">View on Yelp</a>
      <div style={{ position: 'relative' }}>
        <img src={restaurant.image_url} alt={name} style={{ borderRadius: '8px', width: '100%', maxWidth: '760px', maxHeight: '400px', margin: '20px 0' }} />
      </div>
      <div>
        {categories.map((category, index) => (
          <span key={index}>{category.title} </span>
        ))}
      </div>
      <Map latitude={coordinates.latitude} longitude={coordinates.longitude} userLocation={userLocation} />
    </div>
  );
};

RestaurantDetails.propTypes = {
  restaurant: PropTypes.object.isRequired,
  userLocation: PropTypes.object,
};

export default RestaurantDetails;
