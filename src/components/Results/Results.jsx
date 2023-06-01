import React from 'react'

const Results = ({ data }) => {
  return (
    <div className=' bg-slate-100 p-4 rounded-4
    '>
      < p > Город: {data.name} </p >
      <p>Максимальная Температура: {data.main.temp_max} °C </p>
      <p>Средняя Температура: {data.main.temp} °C </p>
      <p>Минимальная температура: {data.main.temp_min} °C </p>
      <p>Влажность: {data.main.humidity} %</p>
      <p>На улице: {data.weather[0].description} </p>
    </div >
  )
}

export default Results