import type { OpenMeteoResponse } from "../types/weather";
import type { AirQualityResponse } from "../types/weather";
import { CurrentWeather } from "../components/FirstColumnMain/CurrentWeather";
import { AirQuality } from "../components/FirstColumnMain/AirQuality";
import { HourlyTemperatureChart } from "../components/SecondColumnMain/HourlyTemperatureChart";
import { HourlyPrecipitationChart } from "../components/SecondColumnMain/HourlyPrecipitationChart";
import { WindCard } from "../components/ThirdColumnMain/WindCard";
import { RelativeHumidity } from "../components/ThirdColumnMain/RelativeHumidity";
import { UvIndex } from "../components/ThirdColumnMain/UvIndex";
import { SunriseSunset } from "../components/FirstColumnMain/SunriseSunset";
import { WeeklyForecast } from "../components/SecondColumnMain/WeeklyForecast";

interface DashboardProps {
  weatherData: OpenMeteoResponse | undefined;
  airData: AirQualityResponse | undefined;
}

export function Dashboard({ weatherData, airData }: DashboardProps) {
  return (
    <div className="grid grid-cols-[300px_1fr_220px] gap-3 items-start">
      {/* colonna sinistra */}
      <div className="flex flex-col gap-3">
        <CurrentWeather weather={weatherData} />
        <AirQuality airQuality={airData} />
        <SunriseSunset sunTime={weatherData?.daily} />
      </div>

      {/* colonna centro */}
      <div className="flex flex-col gap-3">
        <HourlyTemperatureChart hourly={weatherData?.hourly} />
        <HourlyPrecipitationChart hourly={weatherData?.hourly} />
        <WeeklyForecast daily={weatherData?.daily} />
      </div>

      {/* colonna destra */}
      <div className="flex flex-col gap-3">
        <WindCard />
        <UvIndex />
        <RelativeHumidity />
      </div>
    </div>
  );
}
