/* global google */
import { GoogleMap, useLoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./App.css";
import bike from "./bike_2.svg"
import InfoBox from "./InfoBox";
const App = () => {
  const [showInfoBox, setShowInfoBox] = useState(false);
  const [directions, setDirections] = useState(null);
  const [movingMarkerPosition, setMovingMarkerPosition] = useState(null);
  let directionsService;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  

  const markers = [
    { address: "Start", lat: 8.5366, lng: 76.8830 },
    { address: "Finish", lat: 30.3753, lng: 76.2673 },
  ];

  const onMapLoad = (map) => {
    
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
          // animateMovingMarker(result.routes[0].overview_path);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  const animateMovingMarker = (path) => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < path.length) {
        setMovingMarkerPosition({ lat: path[index].lat(), lng: path[index].lng() });
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 75); // Update every second, adjust timing as needed
  };

  useEffect(() => {
    
    if (directions) {
      setShowInfoBox(true);
      animateMovingMarker(directions.routes[0].overview_path);
    }
  }, [directions]);

  return (
    <div className="App">
      {showInfoBox && <InfoBox object={directions.routes[0].legs[0]}/>} 
      
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onClick={() => {
            setDirections(null);
            setMovingMarkerPosition(null);
          }}
        >
          {directions !== null && (
            <>
              <DirectionsRenderer directions={directions} />
              {movingMarkerPosition && (
                <Marker position={movingMarkerPosition} icon={bike} />
              )}
            </>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default App;
