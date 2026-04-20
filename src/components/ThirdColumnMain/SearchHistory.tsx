import type { SearchHistoryItem } from "../../types/weather";

interface SearchHistoryProps {
  history: SearchHistoryItem[];
}

export function SearchHistory({ history }: SearchHistoryProps) {
  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center justify-between text-[11px] mb-2">
        Città recenti
      </div>
      <div className="flex flex-col gap-0.5">
        {history.length === 0 ? (
          <p className="text-[11px]">Nessuna ricerca recente</p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {history.map((item) => (
              <li
                key={item.nome}
                className="flex justify-between items-center p-1"
              >
                <div className="text-[12px]">{item.nome}</div>
                <div className="text-[12px]">{item.temperatura}°</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
