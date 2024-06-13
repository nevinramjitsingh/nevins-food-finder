import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Map = ({ latitude, longitude, userLocation }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    });

    const defaultLayers = platform.createDefaultLayers();
    const map = new window.H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: latitude, lng: longitude },
      zoom: 14,
      pixelRatio: window.devicePixelRatio || 1,
    });

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);

    const marker = new window.H.map.Marker({ lat: latitude, lng: longitude });
    map.addObject(marker);

    const fetchRoute = async () => {
      if (userLocation) {
        try {
          const response = await axios.get(
            `https://router.hereapi.com/v8/routes?transportMode=car&origin=${userLocation.latitude},${userLocation.longitude}&destination=${latitude},${longitude}&return=polyline&apikey=${process.env.REACT_APP_HERE_API_KEY}`
          );
          const route = response.data.routes[0];

          if (route && route.sections) {
            route.sections.forEach((section) => {
              const linestring = window.H.geo.LineString.fromFlexiblePolyline(section.polyline);

              const routeLine = new window.H.map.Polyline(linestring, {
                style: { strokeColor: 'blue', lineWidth: 5 },
              });

              map.addObject(routeLine);

              map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
            });
          } else {
            console.error('No route found');
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      }
    };

    fetchRoute();

    return () => {
      map.dispose();
    };
  }, [latitude, longitude, userLocation]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  userLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};

export default Map;
