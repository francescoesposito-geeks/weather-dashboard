
export async function searchCity(name: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5&language=it&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error:any) {
    console.error(error.message);
  } 
}