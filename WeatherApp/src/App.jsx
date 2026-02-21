import assets from './assets/assets'
import './App.css'
import { useEffect, useState } from 'react';

const API_KEY = "d59e4a3a2602f5d071c88f6365c51669";
const App = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    useEffect(()=>{
        const getWeather = async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            console.log(data);

            setWeather({
                city: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                wind: data.wind.speed,
                humidity: data.main.humidity,
                visibility: data.visibility,
                pressure: data.main.pressure,
                description: data.weather[0].description
            })
        };
        getWeather();
    },[city])

    return (
        <>
            <div className="main">
                <div className="header">
                    <div className="heading">
                        <h2>Weather Forecast</h2>
                    </div>
                    <div className="location">
                        <img src={assets.location} alt="" />
                        <p>{weather ? `${weather.city}, ${weather.country}` : ""}</p>
                    </div>
                    <div className="search">
                        <input type="text" placeholder='Search City' onChange={(e) => setCity(e.target.value)} />
                    </div>
                </div>
                {weather && (
                    <div className="container">
                        <div className="image-container">
                            <img src={assets.front} alt="" />
                        </div>
                        <div className="info">
                            <div className="time">
                                <span>{new Date().toLocaleTimeString()}</span>
                            </div>
                            <div className="weath">
                                <p>{weather.temp}°</p>
                                <div className="sky">
                                    <h2>{weather.description}</h2>
                                    <p>Feels like {weather.feels_like}</p>
                                </div>
                            </div>
                        </div>
                        <div className="boxes">
                            <div className="wind">
                                <span className='win'>Wind</span>
                                <span className='winn'>{weather.wind}km/h</span>
                            </div>
                            <div className="humidity">
                                <span className="hum">Humidity</span>
                                <span className="humi">{weather.humidity}%</span>
                            </div>
                            <div className="visibility">
                                <span className="visi">Visibility</span>
                                <span className="visib">{weather.visibility / 1000}km</span>
                            </div>
                            <div className="pressure">
                                <span className="press">Pressure</span>
                                <span className="pressu">{weather.pressure}hPa</span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
};
export default App
