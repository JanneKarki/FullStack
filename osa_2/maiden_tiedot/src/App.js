import React, { useState, useEffect } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputTerm, setInputTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filterCountries = (searchTerm, countries) => {
    return countries.filter(country => {
      const name = country.name.common.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return name.includes(searchTermLower);
    });
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const displayCountryNames = (countries, handleCountryClick) => {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleCountryClick(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  };

  const displaySelectedCountry = (country) => {
    const { name, capital, flags, languages, area } = country;
    console.log(area)
    const languageList = Object.keys(languages).map((code) => {
      const language = languages[code];
      return <li key={code}>{language}</li>;
    });
    
    return (
      <div>
        <h2>{name.common}</h2>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <p>Languages:</p>
        <ul>
          {languageList}
        </ul>
        <img src={flags.svg} alt={`${name.common} flag`} style={{ maxWidth: '100px' }} />
      </div>
    );
  };
  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setInputTerm(event.target.value);
    setSelectedCountry(null);
  };

  const filteredCountries = filterCountries(inputTerm, countries);
  const numFilteredCountries = filteredCountries.length;

  return (
    <div>
      <p>find countries <input type="text" value={inputTerm} onChange={handleSearchInputChange} placeholder="Search countries" />
      </p>
      {selectedCountry ? (
        displaySelectedCountry(selectedCountry)
      ) : numFilteredCountries <= 0 ? (
        <p>No countries found.</p>
      ) : numFilteredCountries === 1 ? (
        displaySelectedCountry(filteredCountries[0])
      ) : numFilteredCountries <= 10 ? (
        displayCountryNames(filteredCountries, handleCountryClick)
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
};

export default App;
