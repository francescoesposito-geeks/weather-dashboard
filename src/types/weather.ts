// doc chiamate api
export interface OpenMeteoCurrent {

    temperature2m: number,
    weatherCode: number,
    windSpeed10m: number,
    relative_humidity_2m: number
}

export interface OpenMeteoDaily {

    temperature2mmax: number[],
    temperature2mmin: number[],
}

export interface OpenMeteoHourly {

    precipitationProbability: number[]
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


