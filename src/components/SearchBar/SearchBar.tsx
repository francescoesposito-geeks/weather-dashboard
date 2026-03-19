import { use, useState } from "react"
import type { GeoCodingResult } from "../../types/weather"

interface SearchBarProp {

  setValue: (city:string)=> void
  results: GeoCodingResult[]
  setCity: (city: GeoCodingResult) => void
}


export function SearchBar({setValue, results, setCity}:SearchBarProp) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
         <input placeholder="search city" onChange={(e) => {setValue(e.target.value); if (!isOpen) setIsOpen(true)}} />
         {isOpen && 
         <ul>
            {results.map((city) => 
            <li key={city.country} onClick={()=>setCity(city)}>{city.name} {city.country}</li>
            )}
         </ul>
         }
        </>
    )
}