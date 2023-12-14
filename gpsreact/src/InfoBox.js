import React from "react";
import "./InfoBox.css";

const InfoBox = ({ object }) => {
  if (!object) {
    // Handle the case when object is undefined or null
    return (
      <div className="info-box">
        <p>Loading...</p>
      </div>
    );
  }

  // Assuming object has the necessary properties for display
  const { distance, duration, start_address, end_address } = object;

  // Function to get the text before the second comma
  const getTextBeforeSecondComma = (address) => {
    const parts = address.split(",");
    return parts.slice(0, 2).join(",");
  };

  return (
    <div className="info-box">
      <div className="container-address">
        <div className="start">Start: {getTextBeforeSecondComma(start_address)}</div>
        <div className="end">Destination: {getTextBeforeSecondComma(end_address)}</div>
      </div>
      <div className="container-details">
        <div className="det">Time: {duration.text}</div>
        <div className="det">Distance: {distance.text}</div>
      </div>
    </div>
  );
};

export default InfoBox;
