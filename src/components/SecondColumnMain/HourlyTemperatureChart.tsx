import type { OpenMeteoHourly } from "../../types/weather";
import * as Recharts from "recharts";

const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} = Recharts;

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

interface Props {
  hourly?: OpenMeteoHourly;
}

export function HourlyTemperatureChart({ hourly }: Props) {
  if (!hourly) return null;

  const data = hourly.temperature_2m.map((temperature, i) => ({
    time: HOURS[i],
    temp: temperature,
  }));

  const maxTemp = Math.max(...data.map((d) => d.temp));

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.time !== nowHourString) return null;
    return <circle cx={cx} cy={cy} r={5} fill="#378ADD" stroke="none" />;
  };

  const CustomLabel = (props: any) => {
    const { x, y, value } = props;
    if (value !== maxTemp) return null;
    return (
      <text x={x} y={y - 10} textAnchor="middle" fill="#378ADD" fontSize={13}>
        {value}°
      </text>
    );
  };

  const now = new Date();
  const nowHourString = `${String(now.getHours()).padStart(2, "0")}:00`;

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            {/* colore gradiente sfondo */}
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#378ADD" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#378ADD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            // rimuove il trattino accanto alla label
            tickLine={false}
            //  rimuove la linea dell'asse
            axisLine={false}
            // intervallo tra le ore asse x
            interval={2}
          />
          <YAxis
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickFormatter={(roughNumber) => `${roughNumber}°`}
          />

          <Tooltip formatter={(v) => [`${v}°C`, "Temperatura"]} />

          <Area
            // tipo di curva (smooth)
            type="monotone"
            // quale campo degli oggetti plottare sull'asse Y
            dataKey="temp"
            // colore della linea
            stroke="#378ADD"
            // spessore linea
            strokeWidth={2}
            // colore del riempimento sotto la linea, qui usi il gradiente
            fill="url(#gradient)"
            dot={<CustomDot />}
            label={<CustomLabel />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
