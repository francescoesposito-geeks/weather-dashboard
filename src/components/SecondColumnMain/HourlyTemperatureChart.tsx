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

interface HourlyTemperatureChartProps {
  hourly?: OpenMeteoHourly;
}

export function HourlyTemperatureChart({
  hourly,
}: HourlyTemperatureChartProps) {
  if (!hourly) return null;

  // costruisco l'oggetto con i dati
  const dataTimeTemperature = hourly.temperature_2m.map((temperature, i) => ({
    time: HOURS[i],
    temp: temperature,
  }));

  // const nowHourString = new Date().toLocaleTimeString("it-IT", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // ora attuale senza minuti
  const nowHour = new Date().getHours();

  // prendo il valore massimo di temperatura
  const temps = dataTimeTemperature.map((d) => d.temp);
  const yMax = Math.max(...temps) + 5;
  const yMin = Math.min(...temps) - 2;

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    // disegna un pallino solo nell'ora corrente
    const payloadHour = parseInt(payload.time.split(":")[0]);
    if (payloadHour !== nowHour) return null;
    return (
      <>
        <circle cx={cx} cy={cy} r={5} fill="#378ADD" stroke="none" />
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fill="#378ADD"
          fontSize={12}
        >
          {payload.temp}°
        </text>
        ;
      </>
    );
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={dataTimeTemperature}>
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
            domain={[yMin, yMax]}
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
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
