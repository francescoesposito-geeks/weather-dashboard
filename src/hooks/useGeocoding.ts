import { searchCity } from "../services/api";
import { useQuery } from "@tanstack/react-query";

export function useGeocoding(cityName: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cities", cityName],
    queryFn: () => searchCity(cityName),
    enabled: cityName.length >= 3,
  });

  return { cities: data, isLoading, error };
}
