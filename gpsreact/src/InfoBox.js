import React, { useState, useEffect } from "react";
import "./InfoBox.css";

const InfoBox = ({ object }) => {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    // Define a function to fetch prediction from the backend
    const fetchPrediction = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([1.0, 2.0, 3.0, 4.0, 5.0, 6.0]) // Sending array directly
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch prediction');
        }
    
        const data = await response.json();
        setPrediction(data.prediction);
      } catch (error) {
        console.error(error);
        setPrediction('Error fetching prediction');
      }
    };
    

    fetchPrediction();
  }, []); // Empty dependency array to run the effect only once

  if (!object) {
    // Handle the case when object is undefined or null
    return (
      <div className="info-box">
        <p>Loading...</p>
      </div>
    );
  }

  // Assuming object has the necessary properties for display
  const { start, finish, time } = object;

  return (
    <div className="info-box">
      <div className="container-address">
        <div className="start">Start: {`${start.lat}, ${start.lng}`}</div>
        <div className="end">Destination: {`${finish.lat}, ${finish.lng}`}</div>
      </div>
      <div className="container-details">
        <div className="det">Time: {time}</div>
        <div className="prediction">Prediction: {prediction}</div>
        {/* You may add other properties here */}
      </div>
    </div>
  );
};

export default InfoBox;
