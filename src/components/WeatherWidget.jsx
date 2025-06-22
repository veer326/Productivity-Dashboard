import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getWeatherUrl } from '../utils/api.js';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Jaipur');

  const fetchWeather = async () => {
    try {
      const res = await axios.get(getWeatherUrl(city));
      setWeather(res.data);
    } catch (error) {
      console.error('Weather fetch failed:', error);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  });

  return (
    <div className="widget weather-widget">
      <h2>🌦️ Weather</h2>
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {weather ? (
        <div className="weather-info">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp}°C</p>
        </div>
      ) : (
        <p>City not found.</p>
      )}
    </div>
  );
}
