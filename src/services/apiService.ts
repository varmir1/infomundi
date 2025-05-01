import { countryNameMap } from './countryNames';

export const getCountryInfo = async (countryName: string) => {
  try {
    // Convertir el nombre del país a inglés
    const englishName = countryNameMap[countryName] || countryName;
    console.log(countryName);
    
    // Llamada a la API de restcountries
    const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${englishName}`);
    const countryData = await countryResponse.json();
    
    // Llamada a la API de población
    const populationResponse = await fetch(`https://api.api-ninjas.com/v1/population?country=${englishName}`, {
      headers: {
        'X-Api-Key': 'MHM4dKRIHqPb9/bMpEG6Wg==jLfdlZ6nHKgh1Z4B'
      }
    });
    const populationData = await populationResponse.json();
    
    // Si no encontramos el país, intentamos con una búsqueda más amplia
    if (countryData.status === 404) {
      const allCountriesResponse = await fetch(`https://restcountries.com/v3.1/all`);
      const allCountries = await allCountriesResponse.json();
      const foundCountry = allCountries.find((country: any) => 
        country.name.common.toLowerCase().includes(englishName.toLowerCase()) ||
        country.name.official.toLowerCase().includes(englishName.toLowerCase())
      );
      
      if (!foundCountry) {
        throw new Error('Country not found');
      }
      
      return {
        country: foundCountry,
        population: populationData
      };
    }
    
    return {
      country: countryData[0],
      population: populationData
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCountryFromCoordinates = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
    );
    const data = await response.json();
    return data.address.country;
  } catch (error) {
    console.error('Error getting country from coordinates:', error);
    return null;
  }
}; 