import { fetchAirQuality } from "../services/api"
import { useQuery } from "@tanstack/react-query"




export function useAirQuality(lat: number, lon: number) {
  
  const { data, isLoading, error } = useQuery({
  queryKey: ["airQuality", lat, lon],
  queryFn: () => fetchAirQuality(lat, lon),

})

  return { data, isLoading, error }
}