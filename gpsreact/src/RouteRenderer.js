/* global google */
import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";

const RouteRenderer = ({ route, animateMovingMarkerProp }) => {
  const [directions, setDirections] = useState(null);
  const [movingMarkerPosition, setMovingMarkerPosition] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);
  let directionsService;
  let animationInterval;

  useEffect(() => {
    // Create a new DirectionsService instance
    directionsService = new window.google.maps.DirectionsService();

    // Fetch directions when the component mounts or the route changes
    changeDirection(route.start, route.finish);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(animationInterval);
  }, [route]);

  const changeDirection = (origin, destination) => {
    // Request directions from the DirectionsService
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          // Set the directions in the state
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  const animateMovingMarker = (path) => {
    // Animate the moving marker along the path
    if (animationStep < path.length) {
      setMovingMarkerPosition({
        lat: path[animationStep].lat(),
        lng: path[animationStep].lng(),
      });
      setAnimationStep((prevStep) => prevStep + 1);
    }
  };

  useEffect(() => {
    // Set up an interval for the animation
    animationInterval = setInterval(() => {
      animateMovingMarker(directions?.routes[0]?.overview_path || []);
    }, 75);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(animationInterval);
  }, [animationStep, directions]);

  return (
    <>
      {directions !== null && (
        <>
          {/* Render the DirectionsRenderer component */}
          <DirectionsRenderer directions={directions} />

          {/* Render the moving marker */}
          {movingMarkerPosition && (
            <Marker
              position={movingMarkerPosition}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: "blue",
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 7,
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default RouteRenderer;
