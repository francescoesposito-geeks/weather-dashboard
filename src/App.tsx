import { useEffect, useState } from "react";
import "./App.css";
import { NavBarSearch } from "./components/Navbar/NavBarSearch.tsx";
import { useGeocoding } from "./hooks/useGeocoding";
import type {
  GeoCodingResult,
  OpenMeteoResponse,
  SearchHistoryItem,
} from "./types/weather";
import { useWeather } from "./hooks/useWeather";
import { TopBarCurrentLocation } from "./components/TopBar/TopBarCurrentLocation.tsx";
import { Dashboard } from "./pages/_DashBoard.tsx";
import { useAirQuality } from "./hooks/useAirQuality.ts";

function App() {
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const [selectedCity, setSelectedCity] = useState<GeoCodingResult | null>(
    null,
  );
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(
    () => {
      const saved = localStorage.getItem("searchHistory");
      return saved ? JSON.parse(saved) : [];
    },
  );

  const { cities } = useGeocoding(debouncedCity);
  const { weatherData } = useWeather(
    selectedCity?.latitude ?? 0,
    selectedCity?.longitude ?? 0,
    selectedCity?.timezone ?? "",
  );
  const { airQualityData } = useAirQuality(
    selectedCity?.latitude ?? 0,
    selectedCity?.longitude ?? 0,
  );

  const defaultWeatherData: OpenMeteoResponse = {
    hourly: { precipitation_probability: [], temperature_2m: [], uv_index: [] },
    daily: {
      time: [],
      temperature_2m_max: [],
      temperature_2m_min: [],
      sunrise: [],
      sunset: [],
      weather_code: [],
    },
    current: {
      temperature_2m: 0,
      weather_code: 0,
      wind_speed_10m: 0,
      relative_humidity_2m: 0,
      apparent_temperature: 0,
      pressure_msl: 0,
      visibility: 0,
      wind_gusts_10m: 0,
      wind_direction_10m: 0,
      dew_point_2m: 0,
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(city);
    }, 500);
    return () => clearTimeout(timer);
  }, [city]);

  useEffect(() => {
    if (!selectedCity || !weatherData) return;

    const newCityStorage: SearchHistoryItem = {
      nome: selectedCity.name,
      temperatura: weatherData.current.temperature_2m,
    };

    const arrayWithoutDuplicates = searchHistory.filter(
      (city) => city.nome !== newCityStorage.nome,
    );

    const searchHistoryUpdated = [
      newCityStorage,
      ...arrayWithoutDuplicates,
    ].slice(0, 4);

    setSearchHistory(searchHistoryUpdated);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryUpdated));
  }, [selectedCity, weatherData]);

  return (
    <>
      <NavBarSearch
        setValue={setCity}
        onSetCity={setSelectedCity}
        results={cities?.results ?? []}
      />
      <div className="px-6 py-5 grid gap-4">
        <TopBarCurrentLocation city={selectedCity} />
        <Dashboard
          weatherData={weatherData ?? defaultWeatherData}
          airData={airQualityData}
          searchHistory={searchHistory}
        />
      </div>
    </>
  );
}

export default App;
