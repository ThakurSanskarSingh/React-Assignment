import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext.jsx';
import weatherService from '../../services/weatherService.js'; 
import { storage } from '../../utils/storage.js';

// Search Component
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setLoading, setError, setCurrentWeather, setForecast, setLastSearchedCity, unit } = useWeather();

  const handleSearch = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');

    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city, unit),
        weatherService.getForecast(city, unit)
      ]);

      setCurrentWeather(weatherData);
      
      // Process forecast data to get daily forecasts
      const dailyForecasts = forecastData.list
        .filter((_, index) => index % 8 === 0) // Get one forecast per day (every 8th item)
        .slice(0, 5);
      setForecast(dailyForecasts);

      setLastSearchedCity(city);
      storage.save('lastSearchedCity', city);
      storage.save('weatherData', weatherData);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;