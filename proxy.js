const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/search', async (req, res) => {
  const { term, location, radius } = req.query;
  const yelpApiKey = process.env.YELP_API_KEY;

  try {
    const yelpResponse = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${yelpApiKey}`
      },
      params: {
        term,
        location,
        radius,
        limit: 50
      }
    });

    res.json(yelpResponse.data);
  } catch (error) {
    console.error('Error fetching data from Yelp API:', error.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/reverse-geocode', async (req, res) => {
  const { lat, lng } = req.query;
  const hereApiKey = process.env.HERE_API_KEY;

  try {
    const response = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&apikey=${hereApiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching address:', error.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});