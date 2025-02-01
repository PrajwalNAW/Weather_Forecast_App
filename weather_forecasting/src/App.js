import React, { useState, useEffect } from "react";
import axios from "axios";
import weatherImage from './image/weather.png';
import Temperature from './image/hot.png';
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

export default function WeatherApp() {
  const [city, setCity] = useState("Pune"); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(`http://localhost:8080/weather?city=${cityName}`);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
    }
  };

  useEffect(() => {
    fetchWeatherData(city); // Fetch weather data when city is updated
  }, [city]);

  return (
    <div className="container mt-5">
      <img src={weatherImage} alt="weather" style={{ width: "80px" }} className="mx-auto d-block mb-4" />
      <h1 className="text-center mb-4">Weather Forecast App</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {weatherData && (
        <div className="card">
          <div className="card-body text-center">
            <h2 className="card-title">{weatherData.name}, {weatherData.sys?.country}</h2>
            <h4 className="card-text">{moment().format("dddd, MMMM Do YYYY")}</h4>

            <div className="d-flex justify-content-center align-items-center mb-4">
              <img src={Temperature} alt="temperature" style={{ width: "40px", marginRight: "10px" }} />
              <h1 className="display-4">{Math.round(weatherData.main?.temp)}&deg;C</h1>
            </div>

            <h5 className="card-text">
              {weatherData.weather?.[0]?.description.charAt(0).toUpperCase() +
                weatherData.weather?.[0]?.description.slice(1)}
            </h5>
            <p>Wind: {weatherData.wind?.speed} m/s</p>
            <p>Humidity: {weatherData.main?.humidity}%</p>
            <h4 className="text-secondary mt-3">Current Time: {moment().format("HH:mm:ss")}</h4>
          </div>
        </div>
      )}
    </div>
  );
}
