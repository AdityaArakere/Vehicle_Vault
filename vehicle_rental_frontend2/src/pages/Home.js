import "./HomeStyles.css";
import Axios from "axios";
import { useState } from "react";

function Home() {
  function handleSubmit() {
    Axios.post("http://localhost:3001/CheckAvailability", {
      pickDate: pickDate,
      dropDate: dropDate,
      vehicleType: vehicleType,
    }).then((Response) => {
      console.log(Response.data);
    });
  }

  const [pickDate, setPickDate] = useState("");
  const [dropDate, setDropDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  return (
    <div className="main">
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
    </div>
  );
}

export default Home;
