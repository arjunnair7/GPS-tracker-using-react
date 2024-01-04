import React, { useEffect, useState } from "react";
import App from "./App";

const Vehicle = () => {
  // State to store markers data
  const [markers, setMarkers] = useState([]);
  // State to track whether data is still being fetched
  const [loading, setLoading] = useState(true);

  // useEffect to fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001");
        const data = await response.json();
        setMarkers(data);
        setLoading(false); // Set loading to false when data is fetched
        console.log(data);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Pass the fetched markers to the App component
        <App markers={markers} />
      )}
    </div>
  );
};

export default Vehicle;
