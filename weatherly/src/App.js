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

        setForecast({ city: searchData.label, ...forecastResponse});
      })
      .catch((err) => console.log(err))

  }

  console.log(currentWeather);
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
            {forecast && <Forecast min={forecast.list[2]} data={forecast.list[5]}/>}
            {forecast && <Forecast min={forecast.list[10]} data={forecast.list[13]}/>}
            {forecast && <Forecast min={forecast.list[18]} data={forecast.list[21]}/>}
            {forecast && <Forecast min={forecast.list[26]} data={forecast.list[29]}/>}
            {forecast && <Forecast min={forecast.list[34]} data={forecast.list[37]}/>}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
