import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const weatherData = (city) => {
  const { latitude, longitude } = userPosition;

  const APIKey = 'cac0a063696021a70d5b1e61dd40fb2c';
  const URL = city
    ? `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKey}&units=metric&lang=ru`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&lang=ru&units=metric&cnt=5`;

  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Response status was not OK');
      }
      return response.json();
    })
    .then((data) => setWeather({ data }))
    .catch((error) => {
      console.log(`Ошибка при загрузке данных: ${error}`);
    });
};
