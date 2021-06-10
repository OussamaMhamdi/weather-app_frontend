
import React from 'react';
import './weather.style.css';

const Weather = (props)=>{
    return (
        <div className="container">
            <div className="cards">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className = {`wi ${props.weatherIcon} display-1`}  ></i>
                </h5>
                <h1 className="py-2">{props.temp_celsius}&deg;</h1>
                <h1 className="py-3">{props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}</h1>
            </div>
        
        </div>
    );
}

export default Weather;