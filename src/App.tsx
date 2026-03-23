import { useEffect, useState } from "react";
import "./App.css";
import { NavBarSearch } from "./components/Navbar/NavBarSearch.tsx";
import { useGeocoding } from "./hooks/useGeocoding";
import type { GeoCodingResult, OpenMeteoResponse } from "./types/weather";
import { useWeather } from "./hooks/useWeather";
import { TopBarCurrentLocation } from "./components/TopBar/TopBarCurrentLocation.tsx";
import { CurrentWeather } from "./components/FirstColumnMain/CurrentWeather.tsx";
import { Dashboard } from "./pages/_DashBoard.tsx";

function App() {
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const { cities } = useGeocoding(debouncedCity);
  const [selectedCity, setSelectedCity] = useState<GeoCodingResult | null>(
    null,
  );
  const { weatherData } = useWeather(
    selectedCity?.latitude ?? 0,
    selectedCity?.longitude ?? 0,
    selectedCity?.timezone ?? "",
  );

  const defaultWeatherData: OpenMeteoResponse = {
    hourly: { precipitation_probability: [], temperature_2m: [] },
    daily: {
      temperature_2m_max: [],
      temperature_2m_min: [],
      sunrise: [],
      sunset: [],
    },
    current: {
      temperature_2m: 0,
      weather_code: 0,
      wind_speed_10m: 0,
      relative_humidity_2m: 0,
      apparent_temperature: 0,
      pressure_msl: 0,
      visibility: 0,
    },
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(city);
      console.log("la city è cambiata ", city);
    }, 500);
    return () => clearTimeout(timer);
  }, [city]);

  useEffect(() => {
    console.log("città selezionata:", selectedCity);
  }, [selectedCity]);

  console.log("weathehrdatattatatatat", weatherData);

  return (
    <>
      <NavBarSearch
        setValue={setCity}
        onSetCity={setSelectedCity}
        results={cities?.results ?? []}
      />
      <div className="px-6 py-5 grid gap-4">
        <TopBarCurrentLocation city={selectedCity} />
        <Dashboard weatherData={weatherData ?? defaultWeatherData} />
      </div>
    </>
  );
}

export default App;
