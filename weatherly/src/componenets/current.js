const Current = ({data}) => {
    return (
        <div className="current-container">
            <div id="current-heading">
                <h1>04-14</h1>
                <h1 id="city">{data.city}</h1>
            </div>
            <img src={`icons/${data.weather[0].icon}.png`}
            ></img>
            <p id="status">{data.weather[0].description}</p>
            <h1>{Math.floor(data.main.temp)}°F</h1>
            <h3>Details</h3>
            <div id="bottom-current">
                <div className="detail-data">
                    <p className="category">Feels Like:</p>
                    <p>{Math.floor(data.main.feels_like)}°F</p>
                </div>
                <div className="detail-data">
                    <p className="category">Wind:</p>
                    <p>{data.wind.speed}Mph</p>
                </div>
                <div className="detail-data">
                    <p className="category">Humdity:</p>
                    <p>{data.main.humidity}%</p>
                </div>
                <div className="detail-data">
                    <p className="category">Pressure:</p>
                    <p>{data.main.pressure} hPa</p>
                </div>
            </div>
        </div>
    )
}

export default Current;