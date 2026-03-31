interface UvIndexProps {}

export function UvIndex({}: UvIndexProps) {
  return (
    <>
      <div className="flex flex-col p-4">
        <div className="text-[11px] font-medium mb-2 flex items-center justify-between">
          UV Index
        </div>
        <div className="flex gap-3.5 pb-1 mb-1 items-start">
          <span className="text-2xl">numero uv index</span>
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
