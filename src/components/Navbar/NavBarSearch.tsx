import { useState } from "react";

import type { GeoCodingResult } from "../../types/weather";

interface SearchBarProps {
  setValue: (city: string) => void;
  results: GeoCodingResult[];
  onSetCity: (city: GeoCodingResult) => void;
}

export function NavBarSearch({ setValue, results, onSetCity }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-6 h-[52px] flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="7" r="3.5" stroke="#0C447C" stroke-width="1.5" />
            <path
              d="M4 11.5 Q8 14 12 11.5"
              stroke="#0C447C"
              stroke-width="1.5"
              stroke-linecap="round"
              fill="none"
            />
            <path
              d="M8 1v1.5M8 11.5V13M1 7h1.5M11.5 7H13"
              stroke="#0C447C"
              stroke-width="1.2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div>Weatherly</div>
      </div>
      <div className="relative flex-1 max-w-[380px] mx-8">
        <div className="w-full h-[34px] flex items-center px-[10px] gap-2">
          <div className="w-[14px] h-[14px] shrink-0"></div>
          <input
            className="text-[13px] flex-1 p-1 border border-gray-300 rounded-md"
            placeholder="search city"
            onChange={(e) => {
              setValue(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
          />
          <div className="text-[10px] py-[1px] px-[5px]">⌘K</div>
        </div>
        {isOpen && results.length > 0 && (
          <ul className="absolute w-full bg-white border-[0.5px] rounded py-1 mt-1">
            {results.map((city) => (
              <li
                className="px-3 py-2 text-[13px] cursor-pointer hover:bg-[#f0f0f0]"
                key={`${city.latitude}-${city.longitude}`}
                onClick={() => {
                  onSetCity(city);
                  setIsOpen(false);
                }}
              >
                {city.name} {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="px-6 h-[52px] flex items-center justify-between">
        <div className="h-[30px] px-3 text-xs flex items-center gap-[5px]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle
              cx="6"
              cy="6"
              r="5"
              stroke="currentColor"
              stroke-width="1"
            />
            <path
              d="M6 3v3l2 1"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
            />
          </svg>
          <div>Aggiornato ora</div>
        </div>
        <div className="h-[30px] px-3 text-xs flex items-center gap-[5px]">
          °C / °F
        </div>
        <div className="w-[30px] h-[30px] flex items-center justify-center text-[11px] font-medium text-[#0C447C]">
          MB
        </div>
      </div>
    </div>
  );
}
