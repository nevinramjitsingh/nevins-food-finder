# Nevin's Food Finder

Nevin's Food Finder is a web application that helps users discover restaurants based on their food preferences and location. The app integrates the Yelp API for restaurant details and the HERE API for maps and routing. Users can either manually enter their location or use real-time geolocation.

## Features

- Search for restaurants by type of food and location
- Display restaurant details including name, address, rating, and reviews
- Show restaurant location on a map
- Provide routing directions from the user's location to the restaurant
- Modern, minimalist design with a responsive UI

## Technologies Used

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Node.js, Express
- **APIs:** Yelp API, HERE API

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A HERE API key
- A Yelp API key

### Installation

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites:
Make sure you have the following installed on your local machine:

Node.js
npm (Node Package Manager)
Git

Installation:
Clone the repository

git clone https://github.com/your-username/nevins-food-finder.git
cd nevins-food-finder

Install dependencies:

npm install

Create a .env file in the root directory and add your API keys:

REACT_APP_YELP_API_KEY=your_yelp_api_key
REACT_APP_HERE_API_KEY=your_here_api_key

Start the development server:

npm start

Run the Express server:

node proxy.js

Usage:
Search for restaurants: Enter a type of food and location, then click "Find Restaurant."
Use current location: Click the location icon button to use your current location.
View restaurant details: View restaurant details, ratings, and location on the map.

API Integration:

Yelp API

The Yelp API is used to search for restaurants and retrieve restaurant details.

Endpoint: https://api.yelp.com/v3/businesses/search
Parameters: term, location, radius

HERE API

The HERE API is used for geocoding, reverse geocoding, and displaying maps with routes.

Endpoint: https://router.hereapi.com/v8/routes
Parameters: transportMode, origin, destination, return

License:
This project is licensed under the MIT License - see the LICENSE file for details.
