import type { OpenMeteoHourly } from "../../types/weather";

interface UvIndexProps {
  hourly?: OpenMeteoHourly;
}

export function UvIndex({ hourly }: UvIndexProps) {
  if (!hourly) return null;

  const hour = new Date().getHours();
  const uvNow = hourly.uv_index[hour];

  function codificationUvNumber(code: number): string {
    if (code >= 0 && code <= 2.99) return "Basso";
    else if (code >= 3 && code <= 5.99) return "Moderato";
    else if (code >= 6 && code <= 7.99) return "Alto";
    else if (code >= 8 && code <= 9.99) return "Molto Alto";
    else if (code >= 10) return "Estremo";
    else return "";
  }

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="text-[11px] font-medium mb-2 flex items-center justify-between">
          UV Index
        </div>
        <div className="flex gap-4 items-baseline">
          <div className="text-[24px]">{uvNow}</div>
          <div className="text-[#854F0B]">{codificationUvNumber(uvNow)}</div>
        </div>
        <div className="flex flex-col w-full">
          <div className="text-[15px] font-medium text-[#185FA5]"></div>
          <div className="text-[11px] mt-0.5 leading-normal"></div>
          <div className="flex h-1.75 rounded-sm overflow-hidden mt-2 min-w-41.25">
            <div className="bg-[#4CAF50] flex-3"></div>
            <div className="bg-[#FFEB3B] flex-3"></div>
            <div className="bg-[#FF9800] flex-2"></div>
            <div className="bg-[#F44336] flex-1"></div>
            <div className="bg-[#9C27B0] flex-1"></div>
          </div>
          <div className="flex justify-between text-[9px] mt-0.5">
            <div>Basso</div>
            <div>Moderato</div>
            <div>Alto</div>
            <div>Max</div>
          </div>
        </div>
      </div>
    </>
  );
}
