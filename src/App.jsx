import { useState } from 'react';
import Modal from './components/Modal/Modal';
function App() {
  const [inputValue, setInputValue] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [modalText, setModalText] = useState('');

  const [weather, setWeather] = useState('');

  const userGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          console.log('Геопозиция получена');
        },
        function (error) {
          console.log('Ошибка получения геопозиции:', error.message);
        }
      );
    } else {
      console.log('Геолокация не поддерживается в этом браузере.');
    }
  };

  const modalHandler = (text) => {
    if (!text) return;
    setModalText(text);
    setModalActive(true);
  };

  const weatherData = (city) => {
    const APIKey = 'cac0a063696021a70d5b1e61dd40fb2c';
    const URL = city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKey}&units=metric&lang=ru`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&lang=ru&units=metric&cnt=5`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => setWeather({ data }))
      .catch((error) => console.log(error));
  };

  // console.log(weather);
  return (
    <>
      {modalActive && (
        <Modal setModalActive={setModalActive}>{modalText}</Modal>
      )}
      <form
        className=' bg-red-400 w-full block'
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputValue) {
            modalHandler('test');
            return;
          } else {
            weatherData(true);
          }
        }}
      >
        <input
          type='text'
          placeholder='Введите адрес'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button type='submit'>Получить погоду по запросу</button>
      </form>

      <button
        type='button'
        className='btn btn-primary'
        onClick={() => {
          userGeolocation();
        }}
      >
        Получить ваше местоплоложение
      </button>
      <button type='text' onClick={() => weatherData()}>
        Получить погоду по геопозиции
      </button>

      {weather && (
        <div>
          <p>Город: {weather.data.name} </p>
          <p>Олачность: {weather.data.base} </p>
          <p>Температура: {weather.data.main.temp} </p>
          <p>Минимальная температура: {weather.data.main.temp_min} </p>
          <p>На улице: {weather.data.weather[0].description} </p>
        </div>
      )}
    </>
  );
}

export default App;
