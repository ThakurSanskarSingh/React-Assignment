// src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import weatherService from '../services/weatherService';
import storageService from '../services/storageService';

// Import components
import SearchComponent from '../components/weather/SearchComponent';
import WeatherInfo from '../components/weather/WeatherInfo';
import ForecastComponent from '../components/weather/ForecastComponent';
import ErrorComponent from '../components/common/ErrorComponent';
import UnitToggle from '../components/weather/UnitToggle';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Dashboard = () => {
  const { 
    setCurrentWeather, 
    setForecast, 
    setLastSearchedCity, 
    setUnit,
    unit, 
    setLoading, 
    setError,
    error,
    currentWeather,
    lastSearchedCity
  } = useWeather();

  // Auto-refresh every 30 seconds
  useEffect(() => {
    let interval;

    const startAutoRefresh = () => {
      interval = setInterval(async () => {
        if (lastSearchedCity) {
          try {
            const weatherData = await weatherService.getCurrentWeather(lastSearchedCity, unit);
            setCurrentWeather(weatherData);
            storageService.saveWeatherData(weatherData);
          } catch (error) {
            console.error('Auto-refresh failed:', error);
            // Don't show error for auto-refresh failures
          }
        }
      }, 30000); // 30 seconds
    };

    if (currentWeather && lastSearchedCity) {
      startAutoRefresh();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [setCurrentWeather, unit, lastSearchedCity, currentWeather]);

  // Load initial data on mount
  useEffect(() => {
    const loadInitialData = async () => {
      // Load user preferences
      const preferences = storageService.getUserPreferences();
      setUnit(preferences.unit);

      // Load last searched city
      const savedCity = storageService.getLastCity();
      const savedWeather = storageService.getWeatherData();

      if (savedCity) {
        setLastSearchedCity(savedCity);
        
        // Show cached data first if available and recent
        if (savedWeather) {
          setCurrentWeather(savedWeather);
        }

        // Then fetch fresh data
        setLoading(true);
        setError('');

        try {
          const [weatherData, forecastData] = await Promise.all([
            weatherService.getCurrentWeather(savedCity, preferences.unit),
            weatherService.getForecast(savedCity, preferences.unit)
          ]);

          setCurrentWeather(weatherData);
          const dailyForecasts = forecastData.list
            .filter((_, index) => index % 8 === 0)
            .slice(0, 5);
          setForecast(dailyForecasts);

          // Update stored data
          storageService.saveWeatherData(weatherData);
        } catch (err) {
          setError('Failed to refresh weather data');
          console.error('Initial data load failed:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadInitialData();
  }, []); // Only run on mount

  const handleRetryError = () => {
    setError('');
    if (lastSearchedCity) {
      // Trigger a new search for the last city
      const searchComponent = document.querySelector('input[type="text"]');
      if (searchComponent) {
        searchComponent.value = lastSearchedCity;
        searchComponent.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Search Section */}
          <SearchComponent />

          {/* Error Display */}
          <ErrorComponent 
            error={error} 
            onRetry={handleRetryError}
            onClose={handleCloseError}
          />

          {/* Unit Toggle */}
          <UnitToggle />

          {/* Weather Information */}
          <WeatherInfo />

          {/* Forecast */}
          <ForecastComponent />

          {/* Last Updated Info */}
          <LastUpdated />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

// Last Updated Component
const LastUpdated = () => {
  const { currentWeather } = useWeather();
  const [lastUpdated, setLastUpdated] = React.useState(new Date());

  useEffect(() => {
    if (currentWeather) {
      setLastUpdated(new Date());
    }
  }, [currentWeather]);

  if (!currentWeather) return null;

  return (
    <div className="text-center mt-8">
      <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm">
        <Clock className="mr-2" size={14} />
        <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        <span className="ml-2 text-white/60">• Auto-refresh every 30s</span>
      </div>
    </div>
  );
};

export default Dashboard;