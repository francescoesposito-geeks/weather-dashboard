import type { GeoCodingResult, OpenMeteoResponse } from "../../types/weather"

interface CurrentWeatherProps {
  city: GeoCodingResult
  weather: OpenMeteoResponse
}




export function CurrentWeather({city, weather}: CurrentWeatherProps) {

    const data = new Date().toLocaleDateString('it-IT', { 
     weekday: 'long', 
     day: 'numeric', 
     month: 'long' 
    })


    return(
 
        <div>
            <p>{city.name},{city.country}</p>
            <p>{data} - {city.timezone} - {city.latitude} - {city.longitude}</p>
        </div>
  
    )
}

