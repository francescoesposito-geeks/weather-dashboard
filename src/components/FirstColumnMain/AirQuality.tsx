import type { AirQualityResponse } from "../../types/weather";

interface AirQualityProps {
  airQuality: AirQualityResponse | undefined;
}

export function AirQuality({ airQuality }: AirQualityProps) {
  console.log("airquality", airQuality);
  return (
    <div className="flex flex-col">
      <div>qualità dell'aria</div>
      <div className="flex">
        <div>
          <div>{airQuality?.current.european_aqi}</div>
          <div>AQI EU</div>
        </div>
        <div className="flex flex-col">
          <div>Discreta</div>
          <div>
            qualità dell'aria accetabi, possibili rischi per soggetti
            sensibilile
          </div>
          <div>riga valori</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div>PM2.5</div>
          <div>{airQuality?.current.pm2_5}</div>
        </div>
        <div>
          <div>PM10</div>
          <div>{airQuality?.current.pm10}</div>
        </div>
        <div>
          <div>NO₂</div>
          <div>{airQuality?.current.nitrogen_dioxide}</div>
        </div>
        <div>
          <div>O₃</div>
          <div>{airQuality?.current.ozone}</div>
        </div>
      </div>
    </div>
  );
}
