import { useEffect, useState } from 'react'
import './App.css'
import { searchCity, fetchWeather, fetchAirQuality } from './services/api'
import { NavBarSearch } from './components/Navbar/NavBarSearch.tsx';
import {useGeocoding} from './hooks/useGeocoding';
import type { GeoCodingResult } from './types/weather';
import { useWeather } from './hooks/useWeather';
import { TopBarCurrentLocation } from './components/TopBar/TopBarCurrentLocation.tsx';

function App() {

  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const { cities } = useGeocoding(debouncedCity)
  const [selectedCity, setSelectedCity] = useState<GeoCodingResult | null>(null)
  const {data} = useWeather(selectedCity?.latitude??0, selectedCity?.longitude??0, selectedCity?.timezone??"")

  useEffect(()=> {
    const timer = setTimeout(() => {
      setDebouncedCity(city);
      console.log("la city è cambiata ", city)
    }, 500);
    return () => clearTimeout(timer);
  }, [city])

  
  useEffect(() => {
  console.log("città selezionata:", selectedCity)
}, [selectedCity])


  return (
    <>
    <NavBarSearch setValue={setCity} onSetCity={setSelectedCity} results={cities?.results??[]}  />
    <TopBarCurrentLocation city={selectedCity} />
    </>
  )
}

export default App
