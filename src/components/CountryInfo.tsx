import React from 'react';

interface CountryInfoProps {
  countryInfo: {
    country: {
      flags: {
        png: string;
      };
      name: {
        common: string;
      };
      capital: string;
      population: number;
      region: string;
      subregion: string;
    };
    population?: {
      historical_population: Array<{
        year: number;
        population: number;
        yearly_change: number;
        yearly_change_percentage: number;
        migrants: number;
        median_age: number;
        fertility_rate: number;
        density: number;
        urban_population_pct: number;
        percentage_of_world_population: number;
        rank: number;
      }>;
    };
  };
  showPopulationDetails: boolean;
  togglePopulationDetails: () => void;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ 
  countryInfo, 
  showPopulationDetails, 
  togglePopulationDetails 
}) => {
  return (
    <div className="country-info">
      <img 
        src={countryInfo.country.flags.png} 
        alt={`Flag of ${countryInfo.country.name.common}`}
        style={{ width: '100px' }}
      />
      <h2>{countryInfo.country.name.common}</h2>
      <p>Capital: {countryInfo.country.capital}</p>
      <p>Population: {countryInfo.country.population.toLocaleString()}</p>
      <p>Region: {countryInfo.country.region}</p>
      <p>Subregion: {countryInfo.country.subregion}</p>
      
      {countryInfo.population && (
        <>
          <button 
            onClick={togglePopulationDetails}
            className="population-button"
          >
            {showPopulationDetails ? 'Hide population details' : 'Show population details'}
          </button>
          
          {showPopulationDetails && countryInfo.population.historical_population && (
            <div className="population-details">
              <h3>Population Data</h3>
              {countryInfo.population.historical_population.map((yearData, index) => (
                <div key={index} className="year-data">
                  <h4>Year {yearData.year}</h4>
                  <div className="population-stats">
                    <p>Population: {yearData.population.toLocaleString()}</p>
                    <p>Yearly Change: {yearData.yearly_change.toLocaleString()} ({yearData.yearly_change_percentage}%)</p>
                    <p>Migrants: {yearData.migrants.toLocaleString()}</p>
                    <p>Median Age: {yearData.median_age} years</p>
                    <p>Fertility Rate: {yearData.fertility_rate}</p>
                    <p>Density: {yearData.density} people/km²</p>
                    <p>Urban Population: {yearData.urban_population_pct}%</p>
                    <p>World Population Percentage: {yearData.percentage_of_world_population}%</p>
                    <p>World Rank: {yearData.rank}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CountryInfo; 