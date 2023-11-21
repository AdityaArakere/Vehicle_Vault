import "./HomeStyles.css";
import Axios from "axios";
import { useState } from "react";
import VehicleResults from "./VehicleResults";
import React, { useEffect } from "react";

function Home() {
  const [pickDate, setPickDate] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [results, setResults] = useState([]);
  const [totalVehicleCount, setTotalVehicleCount] = useState([]);

  useEffect(() => {
    fetchTotalVehicleCount();
  }, []);

  const fetchTotalVehicleCount = () => {
    Axios.post("http://localhost:3001/fetchTotalVehicleCount").then(
      (Response) => {
        setTotalVehicleCount(Response.data.results[0].total_rental_count);
        console.log(Response.data.results[0].total_rental_count);
      }
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/CheckAvailability",
        {
          pickDate: pickDate,
          dropDate: dropDate,
          vehicleType: vehicleType,
        }
      );
      console.log(response.data.results);
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="main">
      <h1 className="total">{totalVehicleCount} Successful Rentals So Far</h1>
      <h1 class="selectorHeading">Find your vehicle now!</h1>

      {/* <form onSubmit={handleSubmit}> */}
      <div className="userInput">
        <div className="Box">
          <text>Pick-Up</text>
          <br />
          <input
            type="date"
            name="pickDate"
            className="Date"
            onChange={(e) => {
              setPickDate(e.target.value);
            }}
          />
        </div>

        <div className="Box">
          <text>Drop-Off</text>
          <br />
          <input
            type="date"
            name="dropDate"
            className="Date"
            onChange={(e) => {
              setDropDate(e.target.value);
            }}
          />
        </div>

        <div className="Box">
          <text>Vehicle Type</text>
          <br />
          <select
            name="vehicleType"
            className="vehicleType"
            onChange={(e) => {
              setVehicleType(e.target.value);
            }}
          >
            <option id="selectVal" Value="">
              Vehicle Type
            </option>
            <option id="selectVal" Value="cars">
              Car
            </option>
            <option id="selectVal" Value="bikes">
              Bike
            </option>
            <option id="selectVal" Value="scooters">
              Scooter
            </option>
          </select>
        </div>
      </div>

      <div className="Box1">
        <button id="bt1" onClick={handleSubmit}>
          Check Availability
        </button>
      </div>
      {/* </form> */}
      {
        <VehicleResults
          results={results}
          pickDate={pickDate}
          dropDate={dropDate}
        />
      }
    </div>
  );
}

export default Home;
