import React from 'react';
import { useWeather } from '../../context/WeatherContext.jsx';
import  weatherService from '../../services/weatherService.js';

// Unit Toggle Component
const UnitToggle = () => {
  const { unit, setUnit, lastSearchedCity, setLoading, setError, setCurrentWeather, setForecast } = useWeather();

  const toggleUnit = async () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);

    if (lastSearchedCity) {
      setLoading(true);
      setError('');

      try {
        const [weatherData, forecastData] = await Promise.all([
          weatherService.getCurrentWeather(lastSearchedCity, newUnit),
          weatherService.getForecast(lastSearchedCity, newUnit)
        ]);

        setCurrentWeather(weatherData);
        const dailyForecasts = forecastData.list
          .filter((_, index) => index % 8 === 0)
          .slice(0, 5);
        setForecast(dailyForecasts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={toggleUnit}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
      >
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default UnitToggle;