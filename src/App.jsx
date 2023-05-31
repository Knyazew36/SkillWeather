import { useEffect, useState } from 'react';
import Modal from './components/Modal/Modal';
function App() {
  const [inputValue, setInputValue] = useState('');
  const [userPosition, setUserPosition] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const [modalText, setModalText] = useState('');
  const [weather, setWeather] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const userGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setUserPosition({ latitude, longitude });
          setButtonDisabled(false);
        },
        function (error) {
          modalHandler(`'Ошибка получения геопозиции:', ${error.message}`);
        }
      );
    } else {
      modalHandler('Геолокация не поддерживается в этом браузере.');
    }
  };

  const modalHandler = (text) => {
    if (!text) return;
    setModalText(text);
    setModalActive(true);
    setInputValue('');
    setTimeout(() => {
      setModalActive(false);
    }, 2000);
  };

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
      .catch((error) =>
        modalHandler(`Произошла ошибка при получении данных ${error}`)
      );
  };

  return (
    <>
      {modalActive && (
        <Modal setModalActive={setModalActive}>{modalText}</Modal>
      )}
      <div className='flex justify-center flex-col w-[30%] gap-10 m-auto'>
        <form
          className='input w-full flex flex-col gap-4 pt-4'
          onSubmit={(e) => {
            e.preventDefault();
            if (!inputValue) {
              modalHandler('Пожалуйста, ведите название города');
              return;
            } else {
              weatherData(true);
            }
          }}
        >
          <input
            type='text'
            placeholder='Введите название города'
            value={inputValue}
            className='form-control'
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <button type='submit' className='btn btn-primary'>
            Получить погоду по запросу
          </button>
        </form>
        <div className='flex gap-4'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => {
              userGeolocation();
            }}
          >
            Получить ваше местоплоложение
          </button>
          <button
            type='button'
            className='btn btn-success'
            disabled={isButtonDisabled}
            onClick={() =>
              userPosition
                ? weatherData()
                : modalHandler('Для начала необходимо получить вашу геопозицию')
            }
          >
            Получить погоду по геопозиции
          </button>
        </div>
        {weather && (
          <div>
            <p>Город: {weather.data.name} </p>
            <p>Олачность: {weather.data.base} </p>
            <p>Температура: {weather.data.main?.temp} </p>О
            <p>Минимальная температура: {weather.data.main.temp_min} </p>
            <p>На улице: {weather.data.weather[0].description} </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
