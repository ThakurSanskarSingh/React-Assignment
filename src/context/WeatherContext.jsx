import React, { useState, useContext, createContext } from 'react';

// Weather Context for global state management
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastSearchedCity, setLastSearchedCity] = useState('');
  const [unit, setUnit] = useState('metric');

  return (
    <WeatherContext.Provider value={{
      currentWeather, setCurrentWeather,
      forecast, setForecast,
      loading, setLoading,
      error, setError,
      lastSearchedCity, setLastSearchedCity,
      unit, setUnit
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};