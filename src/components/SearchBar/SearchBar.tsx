import { useState } from "react"
import type { GeoCodingResult } from "../../types/weather"

interface SearchBarProps {

  setValue: (city:string)=> void
  results: GeoCodingResult[]
  onSetCity: (city: GeoCodingResult) => void

}


export function SearchBar({setValue, results, onSetCity}:SearchBarProps) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
         <input placeholder="search city" onChange={(e) => {setValue(e.target.value); if (!isOpen) setIsOpen(true)}} />
         {isOpen && 
         <ul>
            {results.map((city) => 
            <li key={`${city.latitude}-${city.longitude}`} onClick={()=>{onSetCity(city); setIsOpen(false)}}>{city.name} {city.country}</li>
            )}
         </ul>
         }
        </>
    )
}