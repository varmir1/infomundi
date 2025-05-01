import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { getCountryInfo, getCountryFromCoordinates } from './services/apiService';
import CountryInfo from './components/CountryInfo';

// Límites del mapa (latitud y longitud)
const maxBounds: [number, number][] = [
  [-90, -180], // esquina suroeste
  [90, 180]    // esquina noreste
] as [number, number][];

function App() {
  const [countryInfo, setCountryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopulationDetails, setShowPopulationDetails] = useState(false);

  function MapClickHandler() {
    const map = useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setLoading(true);
        setError(null);
        
        try {
          const countryName = await getCountryFromCoordinates(lat, lng);
          if (countryName) {
            const data = await getCountryInfo(countryName);
            if (data) {
              setCountryInfo(data);
            } else {
              setError('No se pudo encontrar información para este país');
            }
          } else {
            setError('No se pudo determinar el país en esta ubicación');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('Ocurrió un error al obtener la información del país');
        } finally {
          setLoading(false);
        }
      }
    });
    return null;
  }

  const togglePopulationDetails = () => {
    setShowPopulationDetails(!showPopulationDetails);
  };

  return (
    <div className="App">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100vh', width: '100%' }}
        maxBounds={maxBounds}
        minZoom={2}
        maxZoom={8}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        <MapClickHandler />
      </MapContainer>
      
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {countryInfo && countryInfo.country && (
        <CountryInfo 
          countryInfo={countryInfo}
          showPopulationDetails={showPopulationDetails}
          togglePopulationDetails={togglePopulationDetails}
        />
      )}
    </div>
  );
}

export default App;
