// VehicleCard.js
import "./VehicleCardStyles.css";
import Axios from "axios";
// import placeholder from "../resources/glc.png";
// import { useState } from "react";

function Card({
  placeholder,
  brand,
  model,
  rentalRate,
  registrationNumber,
  bt_description,
  pickDate,
  dropDate,
  vehicleType,
}) {
  const handletest = () => {
    if (bt_description === "Check Availability") {
      cars_test();
    } else {
      vehicle_login();
    }
  };

  function cars_test() {
    alert("inside all cars");
  }

  function vehicle_login() {
    Axios.post(
      "http://localhost:3001/profile",
      {},
      {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        console.log("Response:", response);
        // console.log(response.data.user.customer_id);
        // alert("logged in");
        // alert(brand);
        procedure_call(
          registrationNumber,
          pickDate,
          dropDate,
          rentalRate,
          response.data.user.customer_id,
          vehicleType
        );
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        alert("Not logged in");
      });
  }

  function procedure_call(
    registrationNumber,
    pickDate,
    dropDate,
    rentalRate,
    customerId,
    vehicleType
  ) {
    Axios.post("http://localhost:3001/procedureCall", {
      registrationNumber: registrationNumber,
      pickDate: pickDate,
      dropDate: dropDate,
      rentalRate: rentalRate,
      customerId: customerId,
      vehicleType: vehicleType,
    })
      .then((response) => {
        console.log("ProcedureCall Response:", response);
        window.location.href = "ConfirmationPage";
      })
      .catch((error) => {
        console.error("Error calling procedureCall:", error);
        // Handle errors as needed
      });
  }

  return (
    <div className="mainCard">
      <div className="vehicleImage">
        <img src={placeholder} width="350px" height="200px" alt="Vehicle"></img>
      </div>

      <div className="vehicleDescription">
        <span>Brand: </span> <span>{brand}</span>
        <br />
        <span>Model: </span> <span>{model}</span>
        <br />
        {/* <span>Make: </span> <span>{make}</span>
        <br /> */}
        <span>Rental Rate: </span> <span>{rentalRate}</span>
        <br />
        <button className="bt2" onClick={handletest}>
          {bt_description}
        </button>
      </div>
    </div>
  );
}

export default Card;
