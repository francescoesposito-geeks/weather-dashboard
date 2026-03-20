import { useState } from "react"
import '../../styles/Navbar.css'
import type { GeoCodingResult } from "../../types/weather"

interface SearchBarProps {

  setValue: (city:string)=> void
  results: GeoCodingResult[]
  onSetCity: (city: GeoCodingResult) => void

}


export function NavBarSearch({setValue, results, onSetCity}:SearchBarProps) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="navBar">
         <div className="leftNavBar">
            <div>
                <img src="" alt="" />
            </div>
            <div>
                Weatherly
            </div>
         </div>
         <div className="searchWrap">
            <div className="searchBox">
                <div className="searchIcon">

                </div>
         <input className="searchText" placeholder="search city" onChange={(e) => {setValue(e.target.value); if (!isOpen) setIsOpen(true)}} />
         {isOpen && 
         <ul className="dropdown">
            {results.map((city) => 
            <li key={`${city.latitude}-${city.longitude}`} onClick={()=>{onSetCity(city); setIsOpen(false)}}>{city.name} {city.country}</li>
            )}
         </ul>
         }
         <div className="searchK">
            ⌘K
         </div>
         </div>
         </div>
         <div className="rightNavBar">
            <div>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    Aggiornato ora
                </div>
            </div>
            <div>
                C / F
            </div>
            <div>
                MB
            </div>
         </div>
        </div>
    )
}