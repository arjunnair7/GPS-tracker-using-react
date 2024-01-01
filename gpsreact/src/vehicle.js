import React from "react";
import App from "./App";

const Vehicle = () => {
    const markers = [
        {
          start: { address: "Start", lat: 8.5366, lng: 76.8830 }, //LULU
          finish: { address: "Finish", lat: 8.5154, lng: 76.8977 }
        },
        {
          start: { address: "Start", lat: 8.5366, lng: 76.8830 },   //Sasthamangalam
          finish: { address: "Finish", lat: 8.5130, lng: 76.9715 }
        },
        {
          start: { address: "Start", lat: 8.5366, lng: 76.8830 },   //kazhakootam
          finish: { address: "Finish", lat: 8.5686, lng: 76.8731 }
        }
      ];
      

  return (
    <div>
        <App  markers={markers} />
    </div>
  );
};

export default Vehicle;
