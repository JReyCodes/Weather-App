import './App.css';
import Search from './componenets/search/search';
import Current from './componenets/current';
import { useState } from 'react';
import Forecast from './componenets/forecast';

function App() {
  
  const [currentWeather,setCurrentWeather] = useState(null)
  const [forecast,setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat,lon] = searchData.value.split(" ")
    const currentWeatherFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${'139a51219868f5b39dee6b05f470307b'}&units=imperial`)
    const forecastFetch = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${'139a51219868f5b39dee6b05f470307b'}&units=imperial`)
    
    Promise.all([currentWeatherFetch,forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse});

        const temps = {}
        forecastResponse.list.map((data,i = 1) => {
          let day = (Math.floor(i/8)) 
          if(temps[day]){
            if(temps[day][0] > data.main.temp_min){
              temps[day][0] = data.main.temp_min
            }
            if(temps[day][1] < data.main.temp_max){
              temps[day][1] = data.main.temp_max
            } 
          } else {
            temps[day] = [data.main.temp_min,data.main.temp_max]
          }
        })
        setForecast({ city: searchData.label, temps, ...forecastResponse});
      })
      .catch((err) => console.log(err))

  }

  // console.log(currentWeather);
  console.log(forecast);

  return (
    <div className='heading'>
      <h1 id='title'>Welcome to Weatherly</h1>
      <div className='container'>
        <Search onSearchChange={handleOnSearchChange}/>
        <div className='weather-box'>
        {currentWeather && <Current data={currentWeather}/>}
          {!currentWeather && <p>Welcome to the site! In order to use simply enter your desired location in the search bar above and it will populate with options for you to choose from. The List of cities are filitered to avoid smaller cities popping up and go ahead and give it a try!</p>}
          <div className='forecast'>
            {forecast && <Forecast data={forecast.list[0]} min={forecast.temps[0][0]} max={forecast.temps[0][1]}/>}
            {forecast && <Forecast data={forecast.list[8]} min={forecast.temps[1][0]} max={forecast.temps[1][1]}/>}
            {forecast && <Forecast data={forecast.list[16]} min={forecast.temps[2][0]} max={forecast.temps[2][1]}/>}
            {forecast && <Forecast data={forecast.list[24]} min={forecast.temps[3][0]} max={forecast.temps[3][1]}/>}
            {forecast && <Forecast data={forecast.list[32]} min={forecast.temps[4][0]} max={forecast.temps[4][1]}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
