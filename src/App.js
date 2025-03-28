import './App.css';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast';
import CurrrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async(response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setcurrentWeather({city: searchData.label , ...weatherResponse});
        setForecast({city: searchData.label , ...forecastResponse});
      })
      .catch((err) => console.log(err));
  }

  console.log(forecast);
  
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
