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
    <div className="px-4 py-2 md:px-6 md:py-0 md:h-13 flex flex-wrap md:flex-nowrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="7" r="3.5" stroke="#0C447C" strokeWidth="1.5" />
            <path
              d="M4 11.5 Q8 14 12 11.5"
              stroke="#0C447C"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M8 1v1.5M8 11.5V13M1 7h1.5M11.5 7H13"
              stroke="#0C447C"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-[13px]">Weatherly</div>
      </div>
      <div className="relative w-full order-last md:order-none md:w-auto md:flex-1 md:max-w-95 md:mx-8">
        <div className="w-full h-8.5 flex items-center px-2.5 gap-2">
          <div className="w-3.5 h-3.5 shrink-0"></div>
          <input
            className="text-[13px] flex-1 p-1 border border-gray-300 rounded-md"
            placeholder="Cerca una città..."
            onChange={(e) => {
              setValue(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
          />
          <div className="text-[10px] py-px px-1.25">⌘K</div>
        </div>
        {isOpen && results.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md py-1 mt-1 shadow-lg">
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
      <div className="hidden md:flex px-6 h-13 items-center justify-between">
        <div className="h-7.5 px-3 text-xs flex items-center gap-1.25">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
            <path
              d="M6 3v3l2 1"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <div>Aggiornato ora</div>
        </div>
        <div className="h-7.5 px-3 text-xs flex items-center gap-1.25">
          °C / °F
        </div>
        <div className="w-7.5 h-7.5 flex items-center justify-center text-[11px] font-medium text-[#0C447C]">
          MB
        </div>
      </div>
    </div>
  );
}
