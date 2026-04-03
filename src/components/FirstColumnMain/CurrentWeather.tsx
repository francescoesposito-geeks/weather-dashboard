import type { OpenMeteoResponse } from "../../types/weather";

const SKY_CODES: Record<number, string> = {
  0: "Cielo sereno",
  1: "Principalmente chiaro",
  2: "Parzialmente nuvoloso",
  3: "Nuvoloso",
  45: "Nebbia",
  48: "Depositando nebbia di brina",
  51: "Pioggerella: leggera",
  53: "Pioggerella: moderata",
  55: "Pioggerella: intensa",
  56: "Pioggerella gelata: leggera",
  57: "Pioggerella gelata: intensità elevata",
  61: "Pioggia: debole",
  63: "Pioggia: moderata",
  65: "Pioggia: intensa",
  66: "Pioggia gelata: leggera",
  67: "Pioggia gelata: intensa",
  71: "Nevicate: leggere",
  73: "Nevicate: moderate",
  75: "Nevicate: intense",
  77: "Grandine",
  80: "Rovesci di pioggia: leggeri",
  81: "Rovesci di pioggia: moderati",
  82: "Rovesci di pioggia: intensi",
  85: "Leggere precipitazioni nevose",
  86: "Intense precipitazioni nevose",
  95: "Temporale: leggero",
  96: "Temporale con leggera grandine",
  99: "Temporale con intensa grandine",
};

interface CurrentWeatherCardProps {
  weather: OpenMeteoResponse;
}

export function CurrentWeather({ weather }: CurrentWeatherCardProps) {
  function getWeatherIcon(code: number): string {
    if (code === 0) return "☀️";
    if (code >= 1 && code <= 44) return "⛅";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 49 && code <= 55) return "🌦️";
    if (code >= 56 && code <= 67) return "🌧️";
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "❄️";
    if (code >= 79 && code <= 82) return "🌧️";
    return "⛈️";
  }

  function codificationSky(code: number): string {
    return SKY_CODES[code] ?? "non disponibile";
  }

  function getWindDirection(degrees: number): string {
    if ((degrees >= 0 && degrees < 22.5) || (degrees > 337.5 && degrees <= 360))
      return "N";
    if (degrees >= 22.5 && degrees <= 67.5) return "NE";
    if (degrees > 67.5 && degrees <= 112.5) return "E";
    if (degrees > 112.5 && degrees <= 157.5) return "SE";
    if (degrees > 157.5 && degrees <= 202.5) return "S";
    if (degrees > 202.5 && degrees <= 247.5) return "SO";
    if (degrees > 247.5 && degrees <= 292.5) return "O";
    if (degrees > 292.5 && degrees <= 337.5) return "NO";
    return "errore";
  }

  if (!weather) return <div>Caricamento...</div>;

  return (
    <div className="flex flex-col p-4">
      <div className="text-[11px] mb-2">Meteo attuale</div>

      <div className="flex items-start gap-3 pb-2 mb-2">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
          {getWeatherIcon(weather.current.weather_code)}
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-[52px] leading-none">
            {weather.current.temperature_2m}°
          </div>
          <div className="text-[13px] mt-2">
            {codificationSky(weather.current.weather_code)}
          </div>
          <div className="flex flex-row text-[11px]">
            Percepita {weather.current.apparent_temperature}° · Max
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

      <div className="grid grid-cols-2 gap-2">
        <div className="statsCell">
          <div className="label">Umidità</div>
          <div className="mt-0.75 font-[13px]">
            {weather.current.relative_humidity_2m}%
          </div>
          <div className="h-0.75 bg-gray-100 rounded-sm mt-1">
            <div
              style={{ width: `${weather.current.relative_humidity_2m}%` }}
              className="h-full bg-blue-400 rounded-sm "
            />
          </div>
        </div>
        <div className="statsCell">
          <div className="label">Vento</div>
          <div className="text-[13px] mt-0.75">
            {weather.current.wind_speed_10m} km/h
          </div>
          <div className="text-[11px] mt-0.5">
            {`direzione ${getWindDirection(weather.current.wind_direction_10m)}`}
          </div>
        </div>
        <div className="statsCell">
          <div className="label">Pressione</div>
          <div className="text-[13px] mt-0.75">
            {weather.current.pressure_msl} hPa
          </div>
        </div>
        <div className="statsCell">
          <div className="label">Visibilità</div>
          <div className="text-[13px] mt-0.75">
            {weather.current.visibility / 1000} km
          </div>
        </div>
      </div>
    </div>
  );
}
