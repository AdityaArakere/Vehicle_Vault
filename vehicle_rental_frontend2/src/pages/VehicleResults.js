import React from "react";
import Card from "../components/VehicleCard";

function VehicleResults({ results, pickDate, dropDate }) {
  return (
    <div className="main1">
      {results.map((car, index) => (
        <Card
          placeholder={car.image}
          key={index} // Make sure to provide a unique key for each item in the list
          brand={car.make}
          model={car.model}
          rentalRate={car.rental_rate}
          registrationNumber={car.registration_number}
          bt_description="Rent Now"
          pickDate={pickDate}
          dropDate={dropDate}
          vehicleType={car.vehicle_type}
        />
      ))}
    </div>
  );
}

export default VehicleResults;
