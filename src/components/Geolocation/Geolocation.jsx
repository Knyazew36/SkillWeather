import React, { useState, useCallback } from 'react';

const Geolocation = ({ setUserPosition, modalHandler, userPosition, weatherData }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const userGeolocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setUserPosition({ latitude, longitude });
          setButtonDisabled(false);
        },
        function (error) {
          modalHandler(`Ошибка получения геопозиции: ${error.message}`);
        }
      );
    } else {
      modalHandler('Геолокация не поддерживается в этом браузере.');
    }
  }, [setUserPosition, modalHandler]);

  const handleWeatherData = useCallback(() => {
    if (userPosition) {
      weatherData();
    } else {
      modalHandler('Для начала необходимо получить вашу геопозицию');
    }
  }, [userPosition, weatherData, modalHandler]);

  return (
    <div className='flex gap-4 bg-slate-100 p-4 rounded-4'>
      < button
        type='button'
        className='btn btn-primary'
        onClick={userGeolocation}
      >
        Получить ваше местоположение
      </button >
      <button
        type='button'
        className='btn btn-success'
        disabled={isButtonDisabled}
        onClick={handleWeatherData}
      >
        Получить погоду по геопозиции
      </button>
    </div >
  );
};

export default Geolocation;
