import Axios from "axios";
import "./ConfirmationPageStyles.css";
import { useState } from "react";

function ConfirmationPage() {
  const [rental_id, setRental_id] = useState("");
  const [end_date, setEnd_Date] = useState("");
  const [pickDate, setPickDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  function confirmRental() {
    Axios.post("http://localhost:3001/confirmRental")
      .then((response) => {
        console.log("Response:", response);
        setRental_id(response.data.results[0].rental_id);
        setEnd_Date(response.data.results[0].end_date);
        setPickDate(response.data.results[0].start_date);
        setBookingTime(response.data.results[0].booking_date);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteRental() {
    Axios.post("http://localhost:3001/deleteRental")
      .then((response) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
      window.location.reload();
  }

  confirmRental();

  return (
    <div className="mainconfirm">
      <h1>your rental has been confirmed</h1>
      <h1>your rental id is: {rental_id}</h1>
      <h1>your pick date is: {pickDate}</h1>
      <h1>your end date is: {end_date}</h1>
      <h1>time of booking: {bookingTime}</h1>
      <button id="bt1" onClick={deleteRental}>
        DELETE RENTAL
      </button>
    </div>
  );
}
export default ConfirmationPage;
