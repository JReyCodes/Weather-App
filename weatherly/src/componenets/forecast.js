const Forecast = ({data,min,max}) => {
    return (
        <div id="forecast-box">
            <p>{data.dt_txt.slice(5,10)}</p>
            <div id='forecast-icon'>
                <img src={`icons/${data.weather[0].icon}.png`}></img>
                <p>{data.weather[0].description}</p>
            </div>
            <div>
                <p>MIN</p>  
                <p>{Math.floor(min)}°F</p>
            </div>
            <div>
                <p>MAX</p>
                <p>{Math.floor(max)}°F</p>
            </div>
        </div>
    )
}

export default Forecast;