import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import RestaurantDetails from './components/RestaurantDetails';
import axios from 'axios';
import './index.css';
import logo from './logo.png';

const App = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const fetchRestaurant = async (foodType, location, radius) => {
    const radiusInMeters = radius * 1609; // Convert miles to meters

    try {
      const response = await axios.get('http://localhost:5000/api/search', {
        params: {
          term: foodType,
          location: location,
          radius: radiusInMeters, // Use the converted radius
        },
      });
      const restaurants = response.data.businesses;
      if (restaurants.length > 0) {
        const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        setRestaurant(randomRestaurant);
      } else {
        setRestaurant(null);
      }
    } catch (error) {
      console.error('Error fetching data from Yelp API', error);
    }
  };

  return (
    <div className="container">
      <div className="logo-title">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Nevin&apos;s Food Finder</h1>
      </div>
      <div className="divider"></div>
      <SearchForm fetchRestaurant={fetchRestaurant} setUserLocation={setUserLocation} />
      {restaurant && <RestaurantDetails restaurant={restaurant} userLocation={userLocation} />}
    </div>
  );
};

export default App;
