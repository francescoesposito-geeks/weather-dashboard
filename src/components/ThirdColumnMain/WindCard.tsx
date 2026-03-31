import type { OpenMeteoCurrent } from "../../types/weather";

interface WindCardProps {
  current?: OpenMeteoCurrent;
}

export function WindCard({ current }: WindCardProps) {
  if (!current) return null;

  function codificationWindDirection(code: number): string {
    if ((code >= 0 && code < 22.5) || (code > 337.5 && code <= 360))
      return "Nord";
    else if (code >= 22.5 && code <= 67.5) return "Nord-Est";
    else if (code > 67.5 && code <= 112.5) return "Est";
    else if (code > 112.5 && code <= 157.5) return "Sud-Est";
    else if (code > 157.5 && code <= 202.5) return "Sud";
    else if (code > 202.5 && code <= 247.5) return "Sud-Ovest";
    else if (code > 247.5 && code <= 292.5) return "Ovest";
    else if (code > 292.5 && code <= 337.5) return "Nord-Ovest";
    else return "errore";
  }
  return (
    <>
      <div className="flex flex-col p-4">
        <div className="text-[11px] mb-2">Vento</div>
        <div className="flex items-center gap-3 mb-2.5">
          <div>
            <svg width="50" height="50" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="23"
                fill="none"
                stroke="var(--color-border-tertiary)"
                stroke-width="0.5"
              />
              <text
                x="25"
                y="9"
                text-anchor="middle"
                font-size="8"
                fill="var(--color-text-tertiary)"
                font-family="var(--font-sans)"
              >
                N
              </text>
              <text
                x="25"
                y="44"
                text-anchor="middle"
                font-size="8"
                fill="var(--color-text-tertiary)"
                font-family="var(--font-sans)"
              >
                S
              </text>
              <text
                x="6"
                y="27"
                text-anchor="middle"
                font-size="8"
                fill="var(--color-text-tertiary)"
                font-family="var(--font-sans)"
              >
                O
              </text>
              <text
                x="44"
                y="27"
                text-anchor="middle"
                font-size="8"
                fill="var(--color-text-tertiary)"
                font-family="var(--font-sans)"
              >
                E
              </text>
              <g transform={`rotate(${current.wind_direction_10m}, 25, 25)`}>
                <polygon
                  points="25,12 28,26 22,26"
                  fill="#378ADD"
                  opacity=".9"
                  transform="rotate(-45 25 25)"
                />
                <polygon
                  points="25,38 28,24 22,24"
                  fill="var(--color-border-secondary)"
                  transform="rotate(-45 25 25)"
                />
              </g>
              <circle
                cx="25"
                cy="25"
                r="3"
                fill="var(--color-background-primary)"
                stroke="var(--color-border-secondary)"
                stroke-width="0.5"
              />
            </svg>
          </div>
          <div>
            <div className="flex gap-1 items-baseline">
              <span className="text-[20px]">{current.wind_speed_10m}</span>
              <span className="text-[12px]">km/h</span>
            </div>
            <div className="text-[11px]">{`${codificationWindDirection(current.wind_direction_10m)}`}</div>
            <div className="text-[11px]">{`Raffica ${current.wind_gusts_10m} km/h`}</div>
          </div>
        </div>
      </div>
    </>
  );
}
