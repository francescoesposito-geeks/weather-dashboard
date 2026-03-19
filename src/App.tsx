import { useEffect, useState } from 'react'
import './App.css'
import { searchCity, fetchWeather, fetchAirQuality } from './services/api'
import { SearchBar } from './components/SearchBar/SearchBar';
import {useGeocoding} from './hooks/useGeocoding';
import type { GeoCodingResult } from './types/weather';

function App() {

  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const { cities } = useGeocoding(debouncedCity)
  const [selectedCity, setSelectedCity] = useState<GeoCodingResult | null>(null)

  useEffect(()=> {

    const timer = setTimeout(() => {
      setDebouncedCity(city);
      console.log("la city è cambiata ", city)
    }, 500);
    return () => clearTimeout(timer);
  }, [city])


  return (
    <>
    <SearchBar setValue={setCity} setCity={setSelectedCity} results={cities?.results??[]}  />
    </>
  )
}

export default App
