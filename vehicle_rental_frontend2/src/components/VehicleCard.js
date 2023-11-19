import './VehicleCardStyles.css'
import placeholder from '../resources/glc.png'
import { useState } from 'react';

function Card()
{
    const [brand, setBrand] = useState('Mercedes Benz');
    const [model, setModel] = useState('GLC');
    const [make, setMake] = useState('2020');
    const [rentalRate, setRentalRate] = useState('2000/day');

    return(
    <div className="mainCard">

        <div className="vehicleImage">
            <img src={placeholder} width="350px" height="200px"></img>
        </div>
        
        <div className="vehicleDescription">
            <text>Brand: </text>        <text>{brand}</text><br/>
            <text>Model: </text>        <text>{model}</text><br/>
            <text>Make: </text>         <text>{make}</text><br/>
            <text>Rental Rate: </text>  <text>{rentalRate}</text><br/>
            <button className="bt2">Check Availability</button>
        </div>
        
    </div>)
}

export default Card;