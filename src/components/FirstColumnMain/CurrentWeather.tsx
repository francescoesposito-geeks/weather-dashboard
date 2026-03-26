import type { OpenMeteoResponse } from "../../types/weather";

interface CurrentWeatherCardProps {
  weather: OpenMeteoResponse | undefined;
}

export function CurrentWeather({ weather }: CurrentWeatherCardProps) {
  console.log("CurrentWeather input", weather);

  function codification(code: number): string {
    if (code === 0) {
      return "Clear sky";
    } else if (code === 1) {
      return "Mainly clear";
    } else if (code === 2) {
      return "Partly cloudy";
    } else if (code === 3) {
      return "Overcast";
    } else if (code === 45) {
      return "Fog";
    } else if (code === 48) {
      return "depositing rime fog";
    } else if (code === 51) {
      return "Drizzle: Light";
    } else if (code === 53) {
      return "Drizzle: moderate";
    } else if (code === 55) {
      return "Drizzle: dense intensity";
    } else if (code === 56) {
      return "Freezing Drizzle: Light";
    } else if (code === 57) {
      return "Freezing Drizzle: dense intensity";
    } else if (code === 61) {
      return "Rain: Slight";
    } else if (code === 63) {
      return "Rain: moderate";
    } else if (code === 65) {
      return "Rain: heavy";
    } else if (code === 66) {
      return "Freezing Rain: Light";
    } else if (code === 67) {
      return "Freezing Rain: heavy";
    } else if (code === 71) {
      return "Snow fall: Slight";
    } else if (code === 73) {
      return "Snow fall: moderate";
    } else if (code === 75) {
      return "Snow fall: heavy";
    } else if (code === 77) {
      return "Snow grains";
    } else if (code === 80) {
      return "Rain showers: Slight";
    } else if (code === 81) {
      return "Rain showers: moderate";
    } else if (code === 82) {
      return "Rain showers: violent";
    } else if (code === 85) {
      return "Snow showers slight";
    } else if (code === 86) {
      return "Snow showers heavy";
    } else if (code === 95) {
      return "Thunderstorm: Slight";
    } else if (code === 96) {
      return "Thunderstorm with slight hail";
    } else if (code === 99) {
      return "Thunderstorm with heavy hail";
    }
    return "non disponibile";
  }

  if (!weather) return <div>Caricamento...</div>;

  return (
    <div className="flex flex-col p-4">
      <div className="text-[11px] mb-2">Meteo attuale</div>

      <div className="flex items-start gap-3 pb-2 mb-2">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle
              cx="14"
              cy="14"
              r="6"
              fill="#FAC775"
              stroke="#EF9F27"
              strokeWidth="1"
            />
            <rect
              x="5"
              y="19"
              width="22"
              height="8"
              rx="4"
              fill="#B5D4F4"
              stroke="#85B7EB"
              strokeWidth="0.5"
            />
            <rect
              x="9"
              y="16"
              width="18"
              height="8"
              rx="4"
              fill="#E6F1FB"
              stroke="#B5D4F4"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-[52px] leading-none">
            {weather.current.temperature_2m}°
          </div>
          <div className="text-[13px] mt-2">
            {codification(weather.current.weather_code)}
          </div>
          <div className="flex flex-row text-[11px]">
            Percepita {weather.current.apparent_temperature}° · Max{" "}
            {weather.daily.temperature_2m_max.length > 0
              ? weather.daily.temperature_2m_max[0]
              : 0}
            ° Min{" "}
            {weather.daily.temperature_2m_min.length > 0
              ? weather.daily.temperature_2m_min[0]
              : 0}
            °
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="statsCell">
          <div className="label">Umidità</div>
          <div className="mt-0.75 text-xs">
            {weather.current.relative_humidity_2m}%
          </div>
          <div className="h-0.75 bg-gray-100 rounded-sm mt-1">
            <div
              style={{ width: `${weather.current.relative_humidity_2m}%` }}
              className="h-full bg-blue-400 rounded-sm"
            />
          </div>
        </div>
        <div className="statsCell">
          <div className="label">Vento</div>
          <div className="mt-0.75">{weather.current.wind_speed_10m} km/h</div>
        </div>
        <div className="statsCell">
          <div className="label">Pressione</div>
          <div className="mt-0.75">{weather.current.pressure_msl} hPa</div>
        </div>
        <div className="statsCell">
          <div className="label">Visibilità</div>
          <div className="mt-0.75">{weather.current.visibility / 1000} km</div>
        </div>
      </div>
    </div>
  );
}
