import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

function MapContainer(props) {
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [destination, setDestination] = useState({ lat: 19.123, lng: 72.21 });
  const [pathCoordinates, setPathCoordinates] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);

  const calculateRoute = () => {
    const directionsService = new props.google.maps.DirectionsService();
    const startLatLng = new props.google.maps.LatLng(currentLocation.lat, currentLocation.lng);
    const endLatLng = new props.google.maps.LatLng(destination.lat, destination.lng);
    directionsService.route(
      {
        origin: startLatLng,
        destination: endLatLng,
        travelMode: 'DRIVING'
      },
      (result, status) => {
        if (status === 'OK') {
          const path = result.routes[0].overview_path;
          setPathCoordinates(path);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={currentLocation}
    >
      {calculateRoute()}
      <Polyline
        path={pathCoordinates}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'API_KEY_REMOVED'
})(MapContainer);
