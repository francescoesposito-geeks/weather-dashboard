import { fetchWeather } from "../services/api"
import { useQuery } from "@tanstack/react-query"




export function useWeather(lat: number, lon: number, timezone: string) {
  
  const { data, isLoading, error } = useQuery({
  queryKey: ["weather", lat, lon, timezone],
  queryFn: () => fetchWeather(lat, lon, timezone),

})

  return {weatherData: data, isLoading, error }
}