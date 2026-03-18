import './App.css'
import { searchCity, fetchWeather, fetchAirQuality } from './services/api'

function App() {


    async function test1() {
    const result = await searchCity("Milano")
    console.log("M",result)
  }
  test1()

  async function test2() {
    const result = await fetchWeather(40, 77, "Europe/Rome")
    console.log(result)
  }
  test2()

  async function test3() {
    const result = await fetchAirQuality(50, 100)
    console.log(result)
  }
  test3()



  return (
    <>

    </>
  )
}

export default App
