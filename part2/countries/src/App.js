import axios from "axios";
import { useState, useEffect } from "react";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filterValue, setFilterValeue] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await (await axios.get("https://restcountries.com/v3.1/all")).data
      setAllCountries(data);
    }
    fetchData();
  }, []);

  // Filter the countries
  useEffect(() => {
    const filtered = allCountries.filter(country => country.name.common.toLowerCase().includes(filterValue));
    setFilteredCountries(filtered);
  }, [allCountries, filterValue]);


  const handleFilterChange = (newValue) => {
    setFilterValeue(newValue);
  }


  return (
    <div>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries} />
    </div>
  )
}

const Filter = ({ filterValue, handleFilterChange }) => {
  return (
    <div>
      find countries: <input value={filterValue} onChange={(e) => handleFilterChange(e.target.value)} />
    </div>
  )
}
const Countries = ({ countries }) => {
  const shown = countries.length <= 10;
  const showOne = countries.length === 1;

  const [shownCountry, setShownCountry] = useState(undefined);
  if (showOne && countries[0]?.name.common !== shownCountry?.name.common) setShownCountry(countries[0]);

  return (
    <div>
      {shown ?
        <>

          {!showOne ?
            countries.map((country, i) => <CountryResult key={i} country={country} showThis={() => setShownCountry(countries[i])} />)
            : <></>}
        </>
        :
        <p>Too many matches, specify another filter</p>}


      {shownCountry !== undefined ?
        <Country country={shownCountry} />
        : <></>}    </div>
  )
}

const CountryResult = ({ country, showThis }) => {
  return (
    <div>
      <div>{country.name.common} <button onClick={(e) => showThis()}>show</button></div>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        Capital: {country.capital[0]}
        <br />
        Area: {country.area}
      </p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <WeatherInfo latitude={country.capitalInfo.latlng[0]} longitude={country.capitalInfo.latlng[1]} capitalName={country.capital[0]} />
    </div>
  )
}

const WeatherInfo = ({ latitude, longitude, capitalName }) => {
  const [weatherInfo, setWeatherInfo] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`);
        setWeatherInfo(await res.data);
        setLoaded(true);
      } catch (err) {
        setLoadingError(`Failed to retrieve weather data, code: ${err.code}`);
        setLoaded(true);
        console.error(err);
      }
    }
    fetchData();
  }, [latitude, longitude])

  if (!loaded) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>)
  }
  if (loadingError) {
    return (
      <div>
        <h2>{loadingError}</h2>
      </div>
    )
  }
  return (
    <div>
      <h2>Weather in {capitalName}</h2>
      <p>Temperature: {weatherInfo.main.temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="Weather icon" />
      <p>Wind: {weatherInfo.wind.speed} m/s</p>
    </div>
  )
}


export default App;
