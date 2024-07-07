import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const caughtWather = async () => {
      setLoading(true)
      if (city) {
        try {
          const key = "a158c460bd9302b2f583a08d4ae8a0ca";
          const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`;
          const res = await axios.get(API_URL);
          setWeather(res.data);
          console.log(res.data);
        } catch (error) {
          console.log("Umarım almayız ama alırsak hatamız bu : ", error);
        }
        finally{
          setLoading(false)
        }
      }
    };
    caughtWather();
  }, [search]);
  const handleSearch = (e) => {
    e.preventDefault();
    setCity(search);
  };
  return (
    <>
      <div className="bg-blue-700 h-screen">
    <div className="px-20">
    <form
          onSubmit={handleSearch}
          className="flex flex-col items-center bg-orange-900 bg-opacity-80 backdrop-blur-md border border-orange-950 rounded-lg p-6 shadow-lg"
          >
            <h1 className="text-4xl font-extrabold border-b-2 border-orange-700">Weather App</h1>
          <input
            type="text"
            name=""
            id=""
            className="border-2 rounded-sm w-1/2 mb-20 mt-20"
            onChange={(e) => setSearch(e.target.value)}
          />
        {loading && (
          <div className="mt-80 absolute">Loading...</div>
        )}
          {weather && search ? (
            <div className="">
              {weather && (
                <div className="border-2 p-4 bg-gradient-to-tr bg-red-950 from-green-700 text-white text-3xl font-extrabold ">
                  <h1>Weather in : {weather.name}</h1>
                  <hr className="border-2 border-white" />
                  <p>Temperature: {(weather.main.temp - 273.15).toFixed()}°C</p>
                  <h1 className="text-3xl">Max: {(weather.main.temp_max - 273.15).toFixed()} °C</h1>
                  <h1 className="text-3xl">Min: {(weather.main.temp_min - 273.15).toFixed()} °C</h1>
                  <hr className="border-2 border-white" />
                  <p>Weather: {weather.weather[0].description}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="">
              <h1 className="text-7xl">Bir şehir giriniz...</h1>
            </div>
          )}
        </form>
    </div>
      </div>
    </>
  );
}

export default App;
