# 🌤️ Weather & Air Quality Dashboard — Junior Exercise

> **Difficulty**: Junior | **Estimated time**: 2–4 giorni | **Stack**: React + TypeScript + Tailwind CSS

---

## 🎯 Obiettivo

Costruire una dashboard meteo e qualità dell'aria che mostri dati in tempo reale per una città a scelta dell'utente. L'app deve essere **responsive**, **accessibile** e usare **dati reali** provenienti da API gratuite.

---

## 📦 Stack richiesto

- **React 18+** con **TypeScript**
- **Tailwind CSS** per lo styling
- **React Query** (TanStack Query v5) per il fetching dei dati
- **Recharts** per i grafici
- **Vite** come bundler

---

## 🔑 API da usare (tutte gratuite)

### 1. Open-Meteo — Meteo attuale e previsioni

- **URL base**: `https://api.open-meteo.com/v1/forecast`
- **Documentazione**: https://open-meteo.com/en/docs
- **Auth**: ❌ Nessuna API key richiesta
- **Rate limit**: 10.000 chiamate/giorno (gratuito)

**Esempio di chiamata:**

```
GET https://api.open-meteo.com/v1/forecast
  ?latitude=45.46&longitude=9.19
  &current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m
  &hourly=temperature_2m,precipitation_probability
  &daily=temperature_2m_max,temperature_2m_min,sunrise,sunset
  &timezone=Europe/Rome
  &forecast_days=7
```

**Campi utili da mostrare:**

- `current.temperature_2m` → temperatura attuale
- `current.weather_code` → codice meteo (vedi tabella WMO nella docs)
- `current.wind_speed_10m` → velocità vento
- `current.relative_humidity_2m` → umidità
- `daily.temperature_2m_max/min` → temperatura max/min per 7 giorni
- `hourly.precipitation_probability` → probabilità pioggia

---

### 2. Open-Meteo Air Quality — Qualità dell'aria

- **URL base**: `https://air-quality-api.open-meteo.com/v1/air-quality`
- **Documentazione**: https://open-meteo.com/en/docs/air-quality-api
- **Auth**: ❌ Nessuna API key richiesta

**Esempio di chiamata:**

```
GET https://air-quality-api.open-meteo.com/v1/air-quality
  ?latitude=45.46&longitude=9.19
  &current=pm10,pm2_5,nitrogen_dioxide,european_aqi
  &hourly=european_aqi
```

**Campi da mostrare:**

- `current.european_aqi` → indice qualità aria europeo (0–500)
- `current.pm10` → particolato PM10
- `current.pm2_5` → particolato PM2.5
- `current.nitrogen_dioxide` → biossido di azoto

**Tabella AQI europeo:**
| Valore | Qualità |
|--------|---------|
| 0–20 | Buona |
| 20–40 | Discreta |
| 40–60 | Moderata |
| 60–80 | Scarsa |
| 80–100 | Molto scarsa |
| 100+ | Estremamente scarsa |

---

### 3. Open-Meteo Geocoding — Ricerca città

- **URL base**: `https://geocoding-api.open-meteo.com/v1/search`
- **Documentazione**: https://open-meteo.com/en/docs/geocoding-api
- **Auth**: ❌ Nessuna API key richiesta

**Esempio di chiamata:**

```
GET https://geocoding-api.open-meteo.com/v1/search
  ?name=Milano&count=5&language=it&format=json
```

**Risposta da usare:**

- `results[0].latitude` e `results[0].longitude` → coordinate da passare alle altre API
- `results[0].name` → nome della città
- `results[0].country` → paese
- `results[0].timezone` → fuso orario

---

## 🗂️ Struttura del progetto

```
src/
├── components/
│   ├── SearchBar/
│   │   └── SearchBar.tsx
│   ├── CurrentWeather/
│   │   └── CurrentWeather.tsx
│   ├── AirQuality/
│   │   ├── AirQualityCard.tsx
│   │   └── AqiGauge.tsx
│   ├── WeeklyForecast/
│   │   └── WeeklyForecast.tsx
│   ├── HourlyChart/
│   │   └── HourlyChart.tsx
│   └── WeatherIcon/
│       └── WeatherIcon.tsx
├── hooks/
│   ├── useWeather.ts
│   ├── useAirQuality.ts
│   └── useGeocoding.ts
├── services/
│   └── api.ts
├── types/
│   └── weather.ts
└── App.tsx
```

---

## ✅ Task da completare

### Fase 1 — Setup (30 min)

- [x] **Task 1.1**: Crea il progetto con Vite + React + TypeScript

  ```bash
  npm create vite@latest weather-dashboard -- --template react-ts
  cd weather-dashboard
  npm install
  ```

- [x] **Task 1.2**: Installa le dipendenze necessarie

  ```bash
  npm install @tanstack/react-query recharts axios
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

- [x] **Task 1.3**: Configura Tailwind CSS in `tailwind.config.js` e importalo in `index.css`

- [x] **Task 1.4**: Configura `QueryClient` e `QueryClientProvider` in `main.tsx`

---

### Fase 2 — Tipizzazione e servizi API (45 min)

- [x] **Task 2.1**: Crea il file `src/types/weather.ts` con le interfacce TypeScript per le risposte delle tre API. _Hint: guarda la struttura JSON delle risposte nella documentazione._

- [x] **Task 2.2**: Crea `src/services/api.ts` con le tre funzioni che chiamano le API:
  - `searchCity(name: string)` → chiama l'API Geocoding
  - `fetchWeather(lat: number, lon: number, timezone: string)` → chiama Open-Meteo
  - `fetchAirQuality(lat: number, lon: number)` → chiama Air Quality API

- [x] **Task 2.3**: Testa manualmente le tre funzioni nel browser (puoi temporaneamente importarle in `App.tsx` e fare un `console.log`). Verifica che i dati arrivino correttamente.

---

### Fase 3 — Custom Hooks (45 min)

- [x] **Task 3.1**: Crea `src/hooks/useGeocoding.ts` usando `useQuery` di React Query. Il hook deve:
  - Ricevere una stringa (`cityName`) come parametro
  - Eseguire la query **solo** se `cityName` ha almeno 3 caratteri
  - Restituire `{ cities, isLoading, error }`

- [x] **Task 3.2**: Crea `src/hooks/useWeather.ts` che:
  - Riceve `lat`, `lon`, `timezone` come parametri
  - Usa `useQuery` con una `queryKey` che include le coordinate
  - Restituisce dati meteo, loading state ed errori

- [x] **Task 3.3**: Crea `src/hooks/useAirQuality.ts` sul modello di `useWeather.ts`

> 💡 **Tip**: In React Query, la `queryKey` deve contenere tutto ciò che rende unica la query. Se le coordinate cambiano, la query deve essere rieseguita automaticamente.

---

### Fase 4 — Componenti UI (2–3 ore)

- [ ] **Task 4.1 — SearchBar**: Crea una barra di ricerca con:
  - Input testuale per il nome della città
  - Debounce di 500ms prima di effettuare la chiamata API (_Hint: usa `useState` + `useEffect` oppure la libreria `use-debounce`_)
  - Dropdown con i risultati della ricerca
  - Salva la città selezionata nello stato globale (puoi usare `useState` in `App.tsx` e passarlo come prop)

- [ ] **Task 4.2 — CurrentWeather**: Card che mostra:
  - Nome della città e paese
  - Temperatura attuale (grande, ben visibile)
  - Icona meteo basata sul `weather_code` (vedi tabella WMO nella docs Open-Meteo)
  - Umidità, velocità del vento
  - Orari di alba e tramonto

- [ ] **Task 4.3 — AirQualityCard**: Card che mostra:
  - Valore AQI europeo con colore corrispondente alla qualità
  - Label testuale della qualità ("Buona", "Moderata", ecc.)
  - Valori di PM2.5, PM10 e NO₂ in formato tabella
  - _Bonus_: una barra colorata (gauge) che visualizza l'AQI

- [ ] **Task 4.4 — WeeklyForecast**: Lista dei prossimi 7 giorni con:
  - Nome del giorno della settimana
  - Icona meteo
  - Temperatura massima e minima
  - _Hint_: usa `daily.time` (array di date ISO) e `new Date(dateString).toLocaleDateString('it-IT', { weekday: 'short' })`

- [ ] **Task 4.5 — HourlyChart**: Grafico a linea con Recharts che mostra:
  - Temperatura nelle prossime 24 ore (asse Y)
  - Ora del giorno (asse X)
  - _Hint_: usa `hourly.time` e `hourly.temperature_2m` — ricorda che l'array contiene 168 valori (7 giorni × 24 ore), dovrai prendere solo i primi 24

---

### Fase 5 — Layout e UX (1 ora)

- [ ] **Task 5.1**: Assembla tutti i componenti in `App.tsx` con un layout a griglia responsive:
  - Mobile: tutto in colonna singola
  - Tablet (md): griglia 2 colonne
  - Desktop (lg): griglia 3 colonne con CurrentWeather più grande

- [ ] **Task 5.2**: Aggiungi gestione degli **stati di loading**: mostra uno skeleton o uno spinner mentre i dati vengono caricati

- [ ] **Task 5.3**: Aggiungi gestione degli **stati di errore**: mostra un messaggio chiaro se la chiamata API fallisce

- [ ] **Task 5.4**: Aggiungi uno stato **"nessuna città selezionata"**: mostra un messaggio che invita l'utente a cercare una città

---

### Fase 6 — Bonus (se hai tempo)

- [ ] **Task 6.1**: Salva l'ultima città cercata in `localStorage` e ricaricala all'avvio dell'app
- [ ] **Task 6.2**: Aggiungi dark mode con `tailwind` (`dark:` prefix)
- [ ] **Task 6.3**: Aggiungi animazioni CSS sulle card quando i dati si caricano
- [ ] **Task 6.4**: Rendi il grafico interattivo con tooltip personalizzato in Recharts

---

## ❓ Domande di riflessione

Dopo aver completato l'esercizio, rifletti su queste domande:

1. Perché usiamo React Query invece di `useEffect` + `fetch` direttamente?
2. Cosa succede se l'utente cerca una città velocemente 5 volte di fila? Come React Query gestisce le richieste in-flight?
3. Perché la `queryKey` deve includere le coordinate e non solo il nome della città?
4. Come mai abbiamo separato la logica di fetch nei custom hooks invece di metterla direttamente nei componenti?
5. Quando ha senso usare `staleTime` in React Query?

---

## 🛠️ Comandi utili

```bash
# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Type check
npx tsc --noEmit
```

---

## 📚 Risorse

- [Documentazione Open-Meteo](https://open-meteo.com/en/docs)
- [TanStack Query v5](https://tanstack.com/query/latest)
- [Recharts](https://recharts.org/en-US/api)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WMO Weather Codes](https://open-meteo.com/en/docs#weathervariables) (cerca "WMO Weather interpretation codes")

---

> 🚀 Buona fortuna! Ricorda: quando sei bloccato più di 20 minuti su qualcosa, chiedi aiuto. Il debugging è normale — fa parte del lavoro.
