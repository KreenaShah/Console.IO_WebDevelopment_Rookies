// import React, { useState, useEffect } from 'react';
// import L from 'leaflet';

// const Map = () => {
//   const [sourceLatLng, setSourceLatLng] = useState({ lat: 19.505, lng: 12 });

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         setSourceLatLng({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         });
//       },
//       error => console.error(error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   }, []);

//   const destinationLatLng = { lat: 19.12, lng: 12.1 };

//   const leafletMap = L.map('map').setView(sourceLatLng, 13);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(leafletMap);

//   const sourceMarker = L.marker(sourceLatLng).addTo(leafletMap);
//   const destinationMarker = L.marker(destinationLatLng).addTo(leafletMap);

//   fetch(`http://router.project-osrm.org/route/v1/driving/${sourceLatLng.lng},${sourceLatLng.lat};${destinationLatLng.lng},${destinationLatLng.lat}`)
//     .then(res => res.json())
//     .then(data => {
//       const { routes } = data;
//       const path = routes[0].geometry;

//       const polyline = L.polyline(
//         L.PolylineUtil.decode(path, 6).map(point => [point[1], point[0]]),
//         { color: 'red' }
//       );
//       polyline.addTo(leafletMap);
//       leafletMap.fitBounds(polyline.getBounds());
//     });

//   return <div id="map" style={{ height: '400px', width: '100%' }} />;
// };



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

// function MapContainer(props) {
//   const [selectedPlace, setSelectedPlace] = useState({});
//   const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 });
//   const [destination, setDestination] = useState({ lat: 37.788022, lng: -122.399797 });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         setCurrentLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         });
//       });
//     }
//   }, []);

//   function displayMarker(props, marker, e) {
//     setSelectedPlace(props);
//   }

//   const updateDestination = async address => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_API_KEY_HERE`
//       );
//       const { lat, lng } = response.data.results[0].geometry.location;
//       setDestination({ lat, lng });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => updateDestination('San Francisco')}>
//         Update Destination to San Francisco
//       </button>
//       <Map
//         google={props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={currentLocation}
//       >
//         <Marker position={currentLocation} onClick={displayMarker} name="Current Location" />
//         <Marker position={destination} onClick={displayMarker} name="Destination" />

//         <InfoWindow marker={selectedPlace.marker} visible={selectedPlace.name !== undefined}>
//           <div>
//             <h3>{selectedPlace.name}</h3>
//           </div>
//         </InfoWindow>
//       </Map>
//     </div>
//   );
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDVt7yzkQI8soRSMkBnrSsc8YJxrgoKsg0'
// })(MapContainer);

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

// function MapContainer(props) {
//   const [selectedPlace, setSelectedPlace] = useState({});
//   const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 });
//   const [destination, setDestination] = useState({ lat: 19.1234, lng: 72.9131 });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         setCurrentLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         });
//       });
//     }
//   }, []);

//   function displayMarker(props, marker, e) {
//     setSelectedPlace(props);
//   }

//   const updateDestination = async address => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_API_KEY_HERE`
//       );
//       const { lat, lng } = response.data.results[0].geometry.location;
//       setDestination({ lat, lng });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => updateDestination('San Francisco')}>
//         Update Destination to San Francisco
//       </button>
//       <Map
//         google={props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={currentLocation}
//       >
//         <Marker position={currentLocation} onClick={displayMarker} name="Current Location" />
//         <Marker position={destination} onClick={displayMarker} name="Destination" />

//         <InfoWindow marker={selectedPlace.marker} visible={selectedPlace.name !== undefined}>
//           <div>
//             <h3>{selectedPlace.name}</h3>
//           </div>
//         </InfoWindow>
//       </Map>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

// export default function MapWithRouting(props) {
//   const [selectedPlace, setSelectedPlace] = useState({});
//   const [currentLocation, setCurrentLocation] = useState({ lat: 37.7749, lng: -122.4194 });
//   const [destination, setDestination] = useState({ lat: 19.123, lng: 72.21 });
//   const [pathCoordinates, setPathCoordinates] = useState([]);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//         setCurrentLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         });
//       });
//     }
//   }, []);

//   function displayMarker(props, marker, e) {
//     setSelectedPlace(props);
//   }

//   const updateDestination = async address => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDVt7yzkQI8soRSMkBnrSsc8YJxrgoKsg0`
//       );
//       const { lat, lng } = response.data.results[0].geometry.location;
//       setDestination({ lat, lng });
//       calculateRoute(currentLocation, { lat, lng });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const calculateRoute = (start, end) => {
//     const directionsService = new props.google.maps.DirectionsService();
//     const startLatLng = new props.google.maps.LatLng(start.lat, start.lng);
//     const endLatLng = new props.google.maps.LatLng(end.lat, end.lng);
//     directionsService.route(
//       {
//         origin: startLatLng,
//         destination: endLatLng,
//         travelMode: 'DRIVING'
//       },
//       (result, status) => {
//         if (status === 'OK') {
//           const path = result.routes[0].overview_path;
//           setPathCoordinates(path);
//         } else {
//           console.error(`error fetching directions ${result}`);
//         }
//       }
//     );
//   };

//   return (
//     <div>
//       <Map
//         google={props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={currentLocation}
//       >
//         <Polyline
//           path={pathCoordinates}
//           strokeColor="#0000FF"
//           strokeOpacity={0.8}
//           strokeWeight={2}
//         />
//         <Marker position={currentLocation} onClick={displayMarker} />
//         <Marker position={destination} onClick={displayMarker} />
//       </Map>
//     </div>
//   );
// }

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
  apiKey: 'AIzaSyDVt7yzkQI8soRSMkBnrSsc8YJxrgoKsg0'
})(MapContainer);
