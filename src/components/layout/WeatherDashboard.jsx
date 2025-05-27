import React, { useEffect } from 'react';
import { useWeather } from '../../context/WeatherContext.jsx';
import weatherService from '../../services/weatherService.js';
import { storage } from '../../utils/storage.js';
import { AUTO_REFRESH_INTERVAL } from '../../constants/config.js';
import SearchComponent from '../weather/SeatchComponent.jsx';
import ErrorComponent from '../common/ErrorComponent.jsx';
import UnitToggle from '../common/UnitToggle.jsx';
import WeatherInfo from '../weather/WeatherInfo.jsx';
import ForecastComponent from '../weather/ForecastComponent.jsx';
import LastUpdated from '../common/LastUpdated.jsx';

const WeatherDashboard = () => {
  const { setCurrentWeather, setForecast, setLastSearchedCity, unit, setLoading, setError, error } = useWeather();

  useEffect(() => {
    const interval = setInterval(async () => {
      const savedCity = storage.load('lastSearchedCity');
      if (savedCity && savedCity.value) {
        try {
          const weatherData = await weatherService.getCurrentWeather(savedCity.value, unit);
          setCurrentWeather(weatherData);
        } catch (error) {
          console.error('Auto-refresh failed:', error);
        }
      }
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [setCurrentWeather, unit]);

  useEffect(() => {
    const loadInitialData = async () => {
      const savedCity = storage.load('lastSearchedCity');
      const savedWeather = storage.load('weatherData');

      if (savedCity && savedCity.value) {
        setLastSearchedCity(savedCity.value);
        
        if (savedWeather && savedWeather.value) {
          setCurrentWeather(savedWeather.value);
        }

        setLoading(true);
        try {
          const [weatherData, forecastData] = await Promise.all([
            weatherService.getCurrentWeather(savedCity.value, unit),
            weatherService.getForecast(savedCity.value, unit)
          ]);

          setCurrentWeather(weatherData);
          const dailyForecasts = forecastData.list
            .filter((_, index) => index % 8 === 0)
            .slice(0, 5);
          setForecast(dailyForecasts);
        } catch (err) {
          setError('Failed to refresh weather data');
        } finally {
          setLoading(false);
        }
      }
    };

    loadInitialData();
  }, [setCurrentWeather, setForecast, setLastSearchedCity, setLoading, setError, unit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 py-8 px-4">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-blue-100">Get real-time weather updates for any city</p>
        </header>

        <SearchComponent />
        <ErrorComponent error={error} />
        <UnitToggle />
        <WeatherInfo />
        <ForecastComponent />
        <LastUpdated />

        <footer className="text-center mt-12 text-blue-100 text-sm">
          <p>Weather data provided by OpenWeatherMap API</p>
          <p className="mt-2">Built with React.js | Auto-refreshes every 30 seconds</p>
        </footer>
      </div>
    </div>
  );
};

export default WeatherDashboard;