import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './SearchForm.css'; // Import the CSS file

const SearchForm = ({ fetchRestaurant, setUserLocation }) => {
  const [foodType, setFoodType] = useState('');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodType || !location) {
      alert('Please enter both the type of food and location.');
      return;
    }
    fetchRestaurant(foodType, location, radius);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          try {
            const response = await axios.get(`http://localhost:5000/api/reverse-geocode?lat=${latitude}&lng=${longitude}`);
            const address = response.data.items[0].address.label;
            setLocation(address);
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type of Food: </label>
        <input
          type="text"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
          required
        />
      </div>
      <div className="location-input-container">
        <label>Location: </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location or use current location"
          required
        />
        <button type="button" onClick={handleCurrentLocation} className="location-button">
          <img src="/location-icon.png" alt="Use Current Location" />
        </button>
      </div>
      <div>
        <label>Radius (miles): {radius}</label>
        <input
          type="range"
          min="1"
          max="24"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="radius-slider"
        />
      </div>
      <button type="submit">Find Restaurant</button>
    </form>
  );
};

SearchForm.propTypes = {
  fetchRestaurant: PropTypes.func.isRequired,
  setUserLocation: PropTypes.func.isRequired,
};

export default SearchForm;
