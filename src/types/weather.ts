// doc chiamate api
// current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m,apparent_temperature,pressure_msl,visibility
//hourly=temperature_2m,precipitation_probability
//daily=temperature_2m_max,temperature_2m_min,sunrise,sunset
export interface OpenMeteoCurrent {

    temperature_2m: number,
    weather_code: number,
    wind_speed_10m: number,
    relative_humidity_2m: number,
    apparent_temperature: number,
    pressure_msl: number,
    visibility: number,
}

export interface OpenMeteoDaily {

    temperature_2m_max: number[],
    temperature_2m_min: number[],
    sunrise: string[],  
    sunset: string[],
}

export interface OpenMeteoHourly {

    precipitation_probability: number[]
    temperature_2m: number[]
}

export interface OpenMeteoResponse {

    hourly: OpenMeteoHourly,
    daily: OpenMeteoDaily,
    current: OpenMeteoCurrent,

}


export interface AirQualityCurrent {
    europeanAqi: number,
    pm10: number,
    pm25: number,
    nitrogenDioxide: number,
}

export interface AirQualityResponse {

  current: AirQualityCurrent

 }

export interface GeoCodingResult {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  timezone: string;
}


export interface GeocodingResponse {
    results: GeoCodingResult[],
    generationTime: number,
}


