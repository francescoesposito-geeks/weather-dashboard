
export async function searchCity(name: string) {

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5&language=it&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error:any) {
    console.error(error.message);
  } 
}


export async function fetchWeather(lat: number, lon: number, timezone: string) {

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${timezone}&forecast_days=7`;
    try {
      const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error:any) {
    console.error(error.message);
  } 
}


export async function fetchAirQuality(lat: number, lon: number) {
    
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,nitrogen_dioxide,european_aqi&hourly=european_aqi`;
    try {
      const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error:any) {
    console.error(error.message);
  } 
}


