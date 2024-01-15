/* global google */
import { GoogleMap, useLoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";
import { useState, useEffect, Fragment } from "react";
import "./App.css";
import TimeBox from "./TimeBox";

const App = ({ markers, time }) => {
  const [directions, setDirections] = useState([]);
  const [movingMarkerPositions, setMovingMarkerPositions] = useState([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [timer, setTimer] = useState(time ? time.value : 0);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const customMarker = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "red",
    fillOpacity: 2,
    strokeWeight: 1,
    rotation: 0,
    scale: 1,
  };

  useEffect(() => {
    if (isLoaded && markers && markers.length > 0) {
      markers.forEach((route, index) => {
        changeDirection(route.start, route.finish, index, route.time);
      });

      // Start the timer to change the time every 15 seconds
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => (prevTimer >= 23 ? 0 : prevTimer + 1));
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [isLoaded, markers]);

  const changeDirection = (origin, destination, index, time) => {
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          
          setDirections((prevDirections) => [...prevDirections, result]);
          animateMovingMarker(result.routes[0].overview_path, index);
          
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  const animateMovingMarker = (path, index) => {
    let positions = [];
    let intervalId;

    positions.push({ lat: path[0].lat(), lng: path[0].lng() });

    intervalId = setInterval(() => {
      const lastIndex = positions.length - 1;

      if (lastIndex < path.length - 1) {
        positions.push({ lat: path[lastIndex + 1].lat(), lng: path[lastIndex + 1].lng() });
        setMovingMarkerPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions[index] = positions;
          return newPositions;
        });
      } else {
        clearInterval(intervalId);
      }
    }, 1); // Update every 1 second, adjust timing as needed
  };

  const onMarkerLoad = (index) => {
    setCurrentPositionIndex(0);
    console.log(movingMarkerPositions);

    const intervalId = setInterval(() => {
      setCurrentPositionIndex((prevPositionIndex) =>
        prevPositionIndex >= movingMarkerPositions.length - 1 ? 0 : prevPositionIndex + 1
      );
    }, 100);

    return () => clearInterval(intervalId);
  };

  return (
    <div className="App">
      {directions.length > 0 && <TimeBox time={{ value: timer }} />}

      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerClassName="map-container" zoom={10}>
          {movingMarkerPositions.length == markers.length &&
            directions.map((direction, index) => (
              markers[index] && markers[index].time === timer && (
                <Fragment key={index}>
                  <DirectionsRenderer directions={direction} />
                  {movingMarkerPositions[index] && (
                    <Marker
                      key={`marker-${index}`}
                      onLoad={() => onMarkerLoad(index)}
                      position={movingMarkerPositions[index][0]}
                      icon={customMarker}
                    />
                  )}
                </Fragment>
              )
            ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default App;
