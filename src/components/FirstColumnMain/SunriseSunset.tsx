import type { OpenMeteoDaily } from "../../types/weather";

interface OpenMeteoDailyProps {
  sunTime: OpenMeteoDaily | undefined;
}

export function SunriseSunset({ sunTime }: OpenMeteoDailyProps) {
  const sunriseHour = sunTime?.sunrise[0]?.slice(11);
  const sunsetHour = sunTime?.sunset[0]?.slice(11);

  const calculateDaylightDuration = (sunrise: string, sunset: string) => {
    const [sunriseHours, sunriseMinutes] = sunrise.split(":");
    const [sunsetHours, sunsetMinutes] = sunset.split(":");

    const hoursSunriseNumber = Number(sunriseHours);
    const minutesSunriseNumber = Number(sunriseMinutes);
    const hoursSunsetNumber = Number(sunsetHours);
    const minutesSunsetNumber = Number(sunsetMinutes);

    const sunriseMinutesTotal = hoursSunriseNumber * 60 + minutesSunriseNumber;
    const sunsetMinutesTotal = hoursSunsetNumber * 60 + minutesSunsetNumber;

    const diffMinutes = sunsetMinutesTotal - sunriseMinutesTotal;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}min di luce`;
  };

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
      {sunriseHour && sunsetHour ? (
        <div className="text-[11px] text-center">
          {calculateDaylightDuration(sunriseHour, sunsetHour)}
        </div>
      ) : (
        <p>-- : --</p>
      )}
    </div>
  );
}
