
interface OpenMeteoCurrent {

    temperature2m: number,
    weatherCode: number,
    windSpeed10m: number,
    relative_humidity_2m: number
}

interface OpenMeteoDaily {

    temperature2mmax: number[],
    temperature2mmin: number[],
}

interface OpenMeteoHourly {

    precipitationProbability: number[]
}

interface OpenMeteoResponse {

    hourly: OpenMeteoHourly,
    daily: OpenMeteoDaily,
    current: OpenMeteoCurrent,

}


interface AirQualityCurrent {
    europeanAqi: number,
    pm10: number,
    pm25: number,
    nitrogenDioxide: number,
}

interface AirQualityResponse {

  current: AirQualityCurrent

 }

interface GeoCodingResult {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  timezone: string;
}


interface GeocodingResponse {
    results: GeoCodingResult[],
    generationtime: number,
}


