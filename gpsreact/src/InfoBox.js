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
  const { start, finish, time } = object;

  return (
    <div className="info-box">
      <div className="container-address">
        <div className="start">Start: {`${start.lat}, ${start.lng}`}</div>
        <div className="end">Destination: {`${finish.lat}, ${finish.lng}`}</div>
      </div>
      <div className="container-details">
        <div className="det">Time: {time}</div>
        {/* You may add other properties here */}
      </div>
    </div>
  );
};

export default InfoBox;
