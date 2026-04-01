import type { OpenMeteoResponse } from "../../types/weather";

interface RelativeHumidityProps {
  weather: OpenMeteoResponse | undefined;
}

export function RelativeHumidity({ weather }: RelativeHumidityProps) {
  if (!weather) return null;

  return (
    <div className="flex flex-col p-4">
      <div className="text-[11px] mb-2.5">Umidità relativa</div>
      <div className="mb-1.5 text-[28px]">
        {weather.current.relative_humidity_2m}{" "}
        <span className="text-[14px]">%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-sm mt-1 mb-2">
        <div
          style={{ width: `${weather.current.relative_humidity_2m}%` }}
          className="h-full bg-blue-400 rounded-sm "
        />
      </div>
      <div className="flex justify-between">
        <div className="text-[11px]">Punto rugiada</div>
        <div className="text-[11px]">{weather.current.dew_point_2m} °C</div>
      </div>
    </div>
  );
}
