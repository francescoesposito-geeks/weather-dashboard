import type { GeoCodingResult } from "../../types/weather";

interface CurrentWeatherProps {
  city: GeoCodingResult | null;
}

export function TopBarCurrentLocation({ city }: CurrentWeatherProps) {
  const data = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex items-start justify-between gap-4">
      {!city ? (
        <p></p>
      ) : (
        <div className="flex flex-col gap-0.5">
          <div className="text-[22px] font-medium leading-[1.1]">
            {city.name},{city.country}
          </div>
          <div className="text-[13px]">
            {data} - {city.timezone} - {city.latitude} - {city.longitude}
          </div>
        </div>
      )}
    </div>
  );
}
