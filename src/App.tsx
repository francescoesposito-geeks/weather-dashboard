import { useEffect, useState } from "react";
import "./App.css";
import { NavBarSearch } from "./components/Navbar/NavBarSearch.tsx";
import { useGeocoding } from "./hooks/useGeocoding";
import type { GeoCodingResult, SearchHistoryItem } from "./types/weather";
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
  const { weatherData, isLoading } = useWeather(
    selectedCity?.latitude ?? 0,
    selectedCity?.longitude ?? 0,
    selectedCity?.timezone ?? "",
  );
  const { airQualityData } = useAirQuality(
    selectedCity?.latitude ?? 0,
    selectedCity?.longitude ?? 0,
  );

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
      <div className="px-4 md:px-6 py-5 grid gap-4">
        <TopBarCurrentLocation city={selectedCity} />
        {!selectedCity ? (
          <p className="text-center text-gray-500 py-16">
            Cerca una città per vedere il meteo e la qualità dell'aria
          </p>
        ) : isLoading ? (
          <p className="text-center text-gray-500 py-16">
            Caricamento dei dati meteo...
          </p>
        ) : !weatherData ? (
          <p className="text-center text-red-600 py-16">
            Impossibile caricare i dati meteo. Riprova più tardi.
          </p>
        ) : (
          <Dashboard
            weatherData={weatherData}
            airData={airQualityData}
            searchHistory={searchHistory}
          />
        )}
      </div>
    </>
  );
}

export default App;