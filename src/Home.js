import "./styles.css"
import Search from "./images/search.png";
import Rain from "./images/rain.png";
import Humidity from "./images/humidity.png";
import Wind from "./images/wind.png";
import  Clouds from "./images/clouds.png";
import  Clear from "./images/clear.png";
import  Drizzle from "./images/drizzle.png"
import  Mist from "./images/mist.png"


//Framer Motion Import
import { motion } from "framer-motion"





import { useRef, useState } from "react";

const Home = () => {
  const searchInput = useRef();
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [error, setError] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState(Rain)

  const apiKey = "";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  async function checkWeather(city) {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      const data = await response.json();

      if (data.cod === 200) {
        setCity(data.name);
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setError(false);
        
        
      } else {
        setError(true);
      }
       // check weather condition to determine image
      if(data.weather[0].main === "Clouds"){
         setWeatherIcon(Clouds)
      }
      else if(data.weather[0].main === "Clear"){
         setWeatherIcon(Clear);
      }
   
      else if(data.weather[0].main === "Rain"){
         setWeatherIcon(Rain);
      }
   
      else if(data.weather[0].main === "Drizzle"){
         setWeatherIcon(Drizzle);
      }
   
      else if(data.weather[0].main === "Mist"){
         setWeatherIcon(Mist);
      }
      
    } catch (error) {
      setError(true);
    }

    
  }

  return (
    <>
      <div className="card">
        <div className="search">
          <input ref={searchInput} type="text" placeholder="Enter city" spellCheck="false" />
          <button onClick={() => {
            checkWeather(searchInput.current.value)
 
            }}>
            <img src={Search} alt="" />
          </button>
        </div>

        {error && <div className="error">Enter a valid city name</div>}

        {!error && city && (
          <div className="weather">
            <motion.img src={weatherIcon} alt=""
             initial={{
               y: -100,
               opacity:0
             }}
             animate={{
               y:0,
               opacity:1
             }}
             transition={{
               type: "spring",
               stiffness: 200,
               duration: 0.5,
               ease: "easeInOut"
             }}
            
            />
            <h1 className="temp">{temp}°C</h1>
            <h2 className="city">{city}</h2>
            <div className="details">
              <div className="col">
                <img src={Humidity} alt="" />
                <div>
                  <p className="humidity">{humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="col">
                <img src={Wind} alt="" />
                <div>
                  <p className="wind">{wind} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
