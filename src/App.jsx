import { useState } from 'react';
import Form from './components/Form/Form';
import Geolocation from './components/Geolocation/Geolocation';
import Modal from './components/Modal/Modal';
import Results from './components/Results/Results';

function App() {
  const [userPosition, setUserPosition] = useState({});
  const [inputValue, setInputValue] = useState('');

  const [modalActive, setModalActive] = useState(false);
  const [modalText, setModalText] = useState('');
  const [weather, setWeather] = useState('');


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

      <div className='flex justify-center flex-col w-[50%] gap-4 m-auto  rounded-xl'>
        <Form modalHandler={modalHandler} weatherData={weatherData} setInputValue={setInputValue} inputValue={inputValue} />
        <Geolocation setUserPosition={setUserPosition} modalHandler={modalHandler} userPosition={userPosition} weatherData={weatherData} />
        {weather && (
          <Results data={weather.data} />
        )}
      </div>
    </>
  );
}

export default App;
