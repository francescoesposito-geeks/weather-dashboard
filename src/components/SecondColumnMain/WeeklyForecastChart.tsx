import type { OpenMeteoHourly } from "../../types/weather";
import * as Recharts from "recharts";

const { XAxis, YAxis, Tooltip, ResponsiveContainer, Bar, BarChart } = Recharts;

const HOURS = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

interface HourlyPrecipitationChartProps {
  hourly?: OpenMeteoHourly;
}

export function WeeklyForecastChart({ hourly }: HourlyPrecipitationChartProps) {
  if (!hourly) return null;

  const dataPrecipitation = hourly.precipitation_probability.map(
    (precipitationProbability, i) => ({
      time: HOURS[i],
      prob: precipitationProbability,
    }),
  );

  return (
    <div className="flex flex-col p-4">
      <div className="text-[11px] mb-2">Precipitazioni — prossime 24h</div>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={dataPrecipitation}>
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tick={false}
            interval={2}
            // tick={{ fontSize: 10 }}
            padding={{ left: 10 }}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tickLine={false}
            axisLine={false}
            orientation="right"
            interval={1}
            tick={{ fontSize: 10 }}
            padding={{ top: 15 }}
          />
          <Tooltip formatter={(v) => [`${v}%`, "Precipitazioni"]} />
          <Bar
            dataKey="prob"
            radius={[4, 4, 0, 0]}
            fill={"#378ADD"}
            minPointSize={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
