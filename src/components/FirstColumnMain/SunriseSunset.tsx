import type { OpenMeteoDaily } from "../../types/weather";

interface OpenMeteoDailyProps {
  sunTime: OpenMeteoDaily | undefined;
}

export function SunriseSunset({ sunTime }: OpenMeteoDailyProps) {
  console.log("sunrise", sunTime?.sunrise);
  console.log("sunset", sunTime?.sunset);

  const sunriseHour = sunTime?.sunrise[0].slice(11);
  const sunsetHour = sunTime?.sunset[0].slice(11);
  console.log("sunriseHourrrrrrrr", sunriseHour);
  console.log("sunrisetttttHourrrrrrrr", sunsetHour);

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center text-[11px] mb-2">
        <p>Alba / tramonto</p>
      </div>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex flex-col text-center">
          <div className="label">ALBA</div>
          <div className="text-[18px] mt-1">{sunriseHour}</div>
        </div>
        <div>
          <svg width="120" height="38" viewBox="0 0 120 38">
            <path
              d="M 8 34 Q 60 2 112 34"
              stroke="#FAC775"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 2"
            />
            <circle cx="8" cy="34" r="4" fill="#EF9F27" />
            <circle cx="112" cy="34" r="4" fill="#D85A30" />
            <line
              x1="0"
              y1="34"
              x2="120"
              y2="34"
              stroke="var(--color-border-tertiary)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <div className="flex flex-col text-center">
          <div className="label">TRAMONTO</div>
          <div className="text-[18px] mt-1">{sunsetHour}</div>
        </div>
      </div>
      <div className="text-[11px] text-center">11h 34min di luce</div>
    </div>
  );
}
