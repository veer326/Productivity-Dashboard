const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


