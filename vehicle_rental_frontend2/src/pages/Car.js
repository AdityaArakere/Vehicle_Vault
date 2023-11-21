import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import Card from "../components/VehicleCard";
import "./CarStyles.css";

function Car() {
  const [results, setResults] = useState([]);
  const [vehicleCount, setVehicleCount] = useState([]);

  useEffect(() => {
    fetchData();
    fetchCount();
  }, []);

  const fetchData = () => {
    Axios.post("http://localhost:3001/allVehicles").then((Response) => {
      setResults(Response.data.results);
      // console.log(Response.data.results);
    });
  };

  const fetchCount = () => {
    Axios.post("http://localhost:3001/fetchCount").then((Response) => {
      setVehicleCount(Response.data.results[0].vehicle_count);
      console.log(Response.data.results[0].vehicle_count);
    });
  };

  return (
    <div className="main1">
      <div className="main2">
        <h1>total number of cars: {vehicleCount}</h1>
      </div>
      {results.map((car, index) => (
        <Card
          placeholder={car.image}
          key={index} // Make sure to provide a unique key for each item in the list
          brand={car.make}
          model={car.model}
          rentalRate={car.rental_rate}
          bt_description="Check Availability"
        />
      ))}{" "}
    </div>
  );
}
export default Car;
