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
      return "partly cloudy";
    }

    return "non disponibile";
  }

  if (!weather) return <div>Caricamento...</div>;

  return (
    <div className="flex flex-col p-4">
      <div className="text-[11px]">Meteo attuale</div>

      <div className="flex items-start gap-3 pb-[14px] mb-[14px]">
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
          <div className="font-medium text-[52px]">
            {weather.current.temperature_2m}°
          </div>
          <div className="text-[13px] mt-2">
            {codification(weather.current.weather_code)}
          </div>
          <div className="flex flex-row text-[13px]">
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
          <div className="mt-[3px] text-xs">
            {weather.current.relative_humidity_2m}%
          </div>
          <div className="h-[3px] bg-gray-100 rounded-sm mt-1">
            <div
              style={{ width: `${weather.current.relative_humidity_2m}%` }}
              className="h-full bg-blue-400 rounded-sm"
            />
          </div>
        </div>
        <div className="statsCell">
          <div className="label">Vento</div>
          <div className="mt-[3px]">{weather.current.wind_speed_10m} km/h</div>
        </div>
        <div className="statsCell">
          <div className="label">Pressione</div>
          <div className="mt-[3px]">{weather.current.pressure_msl} hPa</div>
        </div>
        <div className="statsCell">
          <div className="label">Visibilità</div>
          <div className="mt-[3px]">{weather.current.visibility} km</div>
        </div>
      </div>
    </div>
  );
}
