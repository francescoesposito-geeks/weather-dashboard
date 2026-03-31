import type { GeocodingResponse } from "../types/weather";
import type { AirQualityResponse } from "../types/weather";
import type { OpenMeteoResponse } from "../types/weather";

// function nomeDellaFunzione(paramas:typeParams):typeReturnFunction. pipe simbolo di unione
export async function searchCity(
  name: string,
): Promise<GeocodingResponse | undefined> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5&language=it&format=json`;
  try {
    // risposta http
    const response = await fetch(url);

    const result = await response.json();
    //applicativo errore
    if (!response.ok) {
      throw new Error(`Response status: ${result.reason}`);
    }
    if (result === undefined) {
      throw new Error(`contenuto vuoto dell'api`);
    }
    console.log(result);
    return result;
    // errore basso livello(giu il servizio)
  } catch (error: any) {
    console.error(error.reason);
  }
}

export async function fetchWeather(
  lat: number,
  lon: number,
  timezone: string,
): Promise<OpenMeteoResponse | undefined> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m,apparent_temperature,pressure_msl,visibility&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weather_code&timezone=${timezone}&forecast_days=7`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    if (result === undefined) {
      throw new Error(`contenuto vuoto dell'api`);
    }

    return result;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function fetchAirQuality(
  lat: number,
  lon: number,
): Promise<AirQualityResponse | undefined> {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,nitrogen_dioxide,european_aqi,ozone&hourly=european_aqi`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    if (result === undefined) {
      throw new Error(`contenuto vuoto dell'api`);
    }

    return result;
  } catch (error: any) {
    console.error(error.message);
  }
}
