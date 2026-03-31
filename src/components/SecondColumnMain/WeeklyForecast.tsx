import type { OpenMeteoDaily } from "../../types/weather";

interface WeeklyForecastProps {
  daily?: OpenMeteoDaily;
}

function getDay(dateString: string, index: number): string {
  if (index === 0) return "Oggi";
  const date = new Date(dateString);
  return date.toLocaleDateString("it-IT", { weekday: "short" });
}

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

export function WeeklyForecast({ daily }: WeeklyForecastProps) {
  if (!daily) return null;
  console.log("daily code gggg", daily.weather_code);
  const data = daily.time.map((dateString, i) => ({
    day: getDay(dateString, i),
    icon: getWeatherIcon(daily.weather_code[i]),
    max: Math.round(daily.temperature_2m_max[i]),
    min: Math.round(daily.temperature_2m_min[i]),
  }));

  return (
    <div className="flex flex-col p-4">
      <div className="text-[11px] mb-2">Previsioni 7 giorni</div>
      <div className="flex flex-1 justify-around overflow-hidden gap-1.5 w-full  rounded-md px-1.5 py-2 text-center">
        {data.map((item) => (
          <div
            key={item.day}
            className="flex flex-col items-center gap-1 px-1.5 py-2"
          >
            <span className="text-[11px] text-gray-500">{item.day}</span>
            <div className="w-7 h-7 mx-auto my-1.5 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-[12px] font-medium">{item.max}°</span>
            <span className="text-[11px] text-gray-400">{item.min}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
