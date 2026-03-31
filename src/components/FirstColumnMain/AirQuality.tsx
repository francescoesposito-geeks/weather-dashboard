import type { AirQualityResponse } from "../../types/weather";
import { RadialBarChart, RadialBar } from "recharts";

interface AirQualityProps {
  airQuality: AirQualityResponse | undefined;
}

export function AirQuality({ airQuality }: AirQualityProps) {
  const aqi = airQuality?.current.european_aqi ?? 0;
  const data = [{ value: aqi, background: 100 }];

  console.log("datadata", data);

  function codificationAqiEu(code: number): string {
    if (code < 19) {
      return "Buona";
    } else if (code >= 20 && code < 40) {
      return "Accettabile";
    } else if (code >= 40 && code < 60) {
      return "Discreta";
    } else if (code >= 60 && code < 80) {
      return "Scadente";
    } else if (code >= 80 && code <= 100) {
      return "Pessima";
    }
    return "error";
  }

  function codificationAqiExplaination(code: number): string {
    if (code < 19) {
      return "La qualità dell'aria è soddisfacente e comporta pochi o nessun rischio per la salute";
    } else if (code >= 20 && code < 40) {
      return "Aria soddisfacente, rischi minimi";
    } else if (code >= 40 && code < 60) {
      return "Qualità accettabile, lievi rischi per persone sensibili";
    } else if (code >= 60 && code < 80) {
      return "Qualità dell'aria molto insalubre";
    } else if (code >= 80 && code <= 100) {
      return " Aria malsana, effetti sulla salute possibili per tutta la popolazione.";
    }
    return "error";
  }

  return (
    <div className="flex flex-col p-4">
      <div className="text-[11px] font-medium mb-2 flex items-center justify-between">
        Qualità dell'aria
      </div>
      <div className="flex gap-3.5 pb-1 mb-1 items-start">
        <div className="flex items-center gap-3.5 pb-3 border-b-[0.5px] border-gray-100 mb-3">
          {/* ring */}
          <div className="relative w-16 h-16 shrink-0">
            <RadialBarChart
              width={64}
              height={64}
              innerRadius={23}
              outerRadius={30}
              data={data}
              startAngle={90}
              endAngle={-270}
              barSize={10}
            >
              <RadialBar dataKey="background" fill="#FFF" />
              <RadialBar dataKey="value" fill="#378ADD" />
            </RadialBarChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[14px] font-medium">{aqi}</span>
              <span className="text-[9px]">AQI EU</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-[15px] font-medium text-[#185FA5]">
            {codificationAqiEu(aqi)}
          </div>
          <div className="text-[11px] mt-0.5 leading-normal">
            {codificationAqiExplaination(aqi)}
          </div>
          <div className="flex h-1.75 rounded-sm overflow-hidden mt-2 min-w-41.25">
            <div className="bg-[#4CAF50] flex-1"></div>
            <div className="bg-[#8BC34A] flex-1"></div>
            <div className="bg-[#FFEB3B] flex-1"></div>
            <div className="bg-[#FF9800] flex-1"></div>
            <div className="bg-[#F44336] flex-1"></div>
          </div>
          <div className="flex justify-between text-[9px] mt-0.5">
            <div>0</div>
            <div>20</div>
            <div>40</div>
            <div>60</div>
            <div>80</div>
            <div>100+</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="statsCell">
          <div className="label">PM2.5</div>
          <div className="mt-0.75 text-[13px]">
            {airQuality?.current.pm2_5} μg/m³
          </div>
        </div>
        <div className="statsCell">
          <div className="label">PM10</div>
          <div className="mt-0.75 text-[13px]">
            {airQuality?.current.pm10} μg/m³
          </div>
        </div>
        <div className="statsCell">
          <div className="label">NO₂</div>
          <div className="mt-0.75 text-[13px]">
            {airQuality?.current.nitrogen_dioxide} μg/m³
          </div>
        </div>
        <div className="statsCell">
          <div className="label text-[13px]">O₃</div>
          <div className="mt-0.75">{airQuality?.current.ozone} μg/m³</div>
        </div>
      </div>
    </div>
  );
}
