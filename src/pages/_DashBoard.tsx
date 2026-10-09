import type { OpenMeteoResponse, SearchHistoryItem } from "../types/weather";
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
import { SearchHistory } from "../components/ThirdColumnMain/SearchHistory";

interface DashboardProps {
  weatherData: OpenMeteoResponse;
  airData: AirQualityResponse | undefined;
  searchHistory: SearchHistoryItem[];
}

export function Dashboard({
  weatherData,
  airData,
  searchHistory,
}: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[300px_1fr_220px] gap-3 items-start">
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
        <WindCard current={weatherData?.current} />
        <UvIndex hourly={weatherData?.hourly} />
        <RelativeHumidity weather={weatherData} />
        <SearchHistory history={searchHistory} />
      </div>
    </div>
  );
}
