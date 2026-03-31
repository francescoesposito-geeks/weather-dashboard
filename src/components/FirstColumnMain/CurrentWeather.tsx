import type { OpenMeteoResponse } from "../../types/weather";

interface CurrentWeatherCardProps {
  weather: OpenMeteoResponse | undefined;
}

export function CurrentWeather({ weather }: CurrentWeatherCardProps) {
  function getWeatherIcon(code: number): string {
    if (code === 0) return "☀️";
    else if (code >= 1 && code <= 44) return "⛅";
    else if (code >= 45 && code <= 48) return "🌫️";
    else if (code >= 49 && code <= 55) return "🌦️";
    else if (code >= 56 && code <= 67) return "🌧️";
    else if ((code >= 71 && code <= 77) || code === 85 || code === 86)
      return "❄️";
    else if (code >= 79 && code <= 82) return "🌧️";
    else return "⛈️";
  }

  function codificationSky(code: number): string {
    if (code === 0) {
      return "Cielo sereno";
    } else if (code === 1) {
      return "Principalmente chiaro";
    } else if (code === 2) {
      return "Parzialmente nuvoloso";
    } else if (code === 3) {
      return "Nuvoloso";
    } else if (code === 45) {
      return "Nebbia";
    } else if (code === 48) {
      return "Depositando nebbia di brina";
    } else if (code === 51) {
      return "Pioggerella: leggera";
    } else if (code === 53) {
      return "Pioggerella: moderata";
    } else if (code === 55) {
      return "Pioggerella: intensa";
    } else if (code === 56) {
      return "Pioggerella gelata: leggera";
    } else if (code === 57) {
      return "Pioggerella gelata: intensità elevata";
    } else if (code === 61) {
      return "Pioggia: debole";
    } else if (code === 63) {
      return "Pioggia: moderata";
    } else if (code === 65) {
      return "Pioggia: intensa";
    } else if (code === 66) {
      return "Pioggia gelata: leggera";
    } else if (code === 67) {
      return "Pioggia gelata: intensa";
    } else if (code === 71) {
      return "Nevicate: leggere";
    } else if (code === 73) {
      return "Nevicate: moderate";
    } else if (code === 75) {
      return "Nevicate: intense";
    } else if (code === 77) {
      return "Grandine";
    } else if (code === 80) {
      return "Rovesci di pioggia: leggeri";
    } else if (code === 81) {
      return "Rovesci di pioggia: moderati";
    } else if (code === 82) {
      return "Rovesci di pioggia: intensi";
    } else if (code === 85) {
      return "Leggere precipitazioni nevose";
    } else if (code === 86) {
      return "intense precipitazioni nevose";
    } else if (code === 95) {
      return "Temporale: leggero";
    } else if (code === 96) {
      return "Temporale con leggera grandine";
    } else if (code === 99) {
      return "Temporale con intensa grandine";
    }
    return "non disponibile";
  }

  function codificationWindDirection(code: number): string {
    if ((code >= 0 && code < 22.5) || (code > 337.5 && code <= 360)) return "N";
    else if (code >= 22.5 && code <= 67.5) return "NE";
    else if (code > 67.5 && code <= 112.5) return "E";
    else if (code > 112.5 && code <= 157.5) return "SE";
    else if (code > 157.5 && code <= 202.5) return "S";
    else if (code > 202.5 && code <= 247.5) return "SO";
    else if (code > 247.5 && code <= 292.5) return "O";
    else if (code > 292.5 && code <= 337.5) return "NO";
    else return "errore";
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
            {`direzione ${codificationWindDirection(weather.current.wind_direction_10m)}`}
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
