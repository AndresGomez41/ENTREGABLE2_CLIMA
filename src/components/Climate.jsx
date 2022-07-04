import axios from "axios";
import React, { useEffect, useState } from "react";
import humidity from "../assets/humidity.png";
import gauge from "../assets/gauge.png";
import cloud from "../assets/cloud.png";
import wind from "../assets/wind.png";

const Climate = () => {
  const [data, setData] = useState({});
  const [unit, setUnit] = useState(true);

  const changeUnit = () => {
    setUnit(!unit);
  };

  useEffect(() => {
    const success = (pos) => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dd3fca4035cc0624628daf4833d2922c&units=${
        unit ? "metric" : "imperial"
      }`;
      axios.get(url).then((res) => setData(res.data));
      console.log("este es url", url);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, [unit]);

  console.log(data);
  console.log(unit);
  
  return (
    <div className="climate">
      <h1>Weather App</h1>
      <div className="mainClimate">
        <div className="temp">
            <h1 style={{ fontSize: "65px"}}>{data.main?.temp}{unit ? "°C" : "°F"}</h1>
            <h2>{data.name}, {data.sys?.country}</h2>
            <button onClick={changeUnit}>{unit ? "°C / °F" : "°F/ °C"}</button>
        </div>
        <div className="main-img">
            <img className="main-icon" src={`https://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`}/>
            <h2  style={{ fontSize: "22px" }}>{data.weather?.[0].description}</h2>
        </div>
    
        <div className="card">
            <h2>
            <img src={wind} /> <span>Wind speed:</span> {data.wind?.speed}{" "}
            {unit ? "m/s" : "mph"}
            </h2>
            <h2>
            <img src={cloud} /> <span>Clouds: </span> {data.clouds?.all}%
            </h2>
            <h2>
            <img src={gauge} /> <span>Pressure: </span> {data.main?.pressure} hPa
            </h2>
            <h2>
            <img src={humidity} /> <span>Humidity: </span> {data.main?.humidity}%
            </h2>
        </div>
      </div>
    </div>
  );
};

export default Climate;
