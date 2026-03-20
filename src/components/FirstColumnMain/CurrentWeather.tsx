import type { OpenMeteoResponse } from "../../types/weather";

interface CurrentWeatherCardProps {
  weather: OpenMeteoResponse;
}

export function CurrentWeather({ weather }: CurrentWeatherCardProps) {
  console.log("CurrentWeather input", weather);

  return (
    <div className="card">
      <div className="section-label">
        Meteo attuale <span className="api-tag">open-meteo.com · current</span>
      </div>

      <div className="weather-big">
        <div className="weather-icon-big">
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
        <div>
          <div className="val-big">{weather.current.temperature_2m}°</div>
          <div>{weather.current.weather_code}</div>
          <div>
            Percepita {weather.current.apparent_temperature}° · Max{" "}
            {weather.daily.temperature_2m_max.length > 0
              ? weather.daily.temperature_2m_max[0]
              : 0}
            ° Min
            {weather.daily.temperature_2m_min.length > 0
              ? weather.daily.temperature_2m_min[0]
              : 0}
            °
          </div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-cell">
          <div className="label">Umidità</div>
          <div className="val">{weather.current.relative_humidity_2m}%</div>
        </div>
        <div className="stat-cell">
          <div className="label">Vento</div>
          <div className="val">{weather.current.wind_speed_10m} km/h</div>
        </div>
        <div className="stat-cell">
          <div className="label">Pressione</div>
          <div className="val">{weather.current.pressure_msl} hPa</div>
        </div>
        <div className="stat-cell">
          <div className="label">Visibilità</div>
          <div className="val">{weather.current.visibility} km</div>
        </div>
      </div>
    </div>
  );
}
