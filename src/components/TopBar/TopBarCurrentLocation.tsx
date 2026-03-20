import type { GeoCodingResult, OpenMeteoResponse } from "../../types/weather"

interface CurrentWeatherProps {
  city: GeoCodingResult | null
}


export function TopBarCurrentLocation({city}: CurrentWeatherProps) {

    const data = new Date().toLocaleDateString('it-IT', { 
     weekday: 'long', 
     day: 'numeric', 
     month: 'long' 
    })

    return(

        (!city) 
         ? 
        (<p>Cerca una città...</p>) 
         :
        (<div className="topBar">
            <div className="leftTopBar">
              <div>{city.name},{city.country}</div>
              <div>{data} - {city.timezone} - {city.latitude} - {city.longitude}</div>
            </div>
            <div className="rightTopBar">
                <div>
                    oggi
                </div>
                <div>
                    7 giorni
                </div>
                <div>
                    14 giorni
                </div>
                <div>
                    mappe
                </div>
            </div>
        </div>)
  
    )
}

