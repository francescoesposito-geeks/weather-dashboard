import type { OpenMeteoDaily } from "../../types/weather";

interface Props {
  daily?: OpenMeteoDaily;
}

function getDay(dateString: string, index: number): string {
  if (index === 0) return "Oggi";
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT", { weekday: "short" });
}

function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 55) return "🌦️";
  if (code <= 65) return "🌧️";
  if (code <= 75) return "❄️";
  if (code <= 82) return "🌧️";
  return "⛈️";
}

export function WeeklyForecast({ daily }: Props) {
  if (!daily) return null;

  const data = daily.time.map((dateString, i) => ({
    day: getDay(dateString, i),
    icon: getWeatherIcon(daily.weather_code[i]),
    max: Math.round(daily.temperature_2m_max[i]),
    min: Math.round(daily.temperature_2m_min[i]),
  }));

  return (
    <div className="flex flex-col p-4">
      <div className="text-[11px] mb-2">Previsioni 7 giorni</div>
      <div className="flex justify-around gap-1.5 w-full flex-1 rounded-md px-1.5 py-2 text-center">
        {data.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-gray-500">{item.day}</span>
            <span className="w-7 h-7 rounded-lg mx-auto my-1.5 flex items-center justify-center">
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.max}°</span>
            <span className="text-xs text-gray-400">{item.min}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
