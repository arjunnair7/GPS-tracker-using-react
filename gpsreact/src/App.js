/* global google */
import { GoogleMap, useLoadScript, DirectionsRenderer } from "@react-google-maps/api";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [directions, setDirections] = useState(null);
  let directionsService;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [mapRef, setMapRef] = useState();

  const markers = [
    { address: "Start", lat: 8.5366, lng: 76.8830 },
    { address: "Finish", lat: 8.5154, lng: 76.8977 },
  ];

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
    directionsService = new google.maps.DirectionsService();
    changeDirection(markers[0], markers[1]);
  };

  const changeDirection = (origin, destination) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onClick={() => setDirections(null)}
        >
          {directions !== null && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default App;
