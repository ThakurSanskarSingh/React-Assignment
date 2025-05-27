import React from 'react';
import { MapPin, Thermometer, Droplets, Wind, Eye } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext.jsx';
import { getWeatherIcon } from '../../utils/weatherIcons.js';

// Weather Info Component
const WeatherInfo = () => {
  const { currentWeather, loading, unit } = useWeather();

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentWeather) return null;

  const WeatherIcon = getWeatherIcon(currentWeather.weather[0].main);
  const temp = Math.round(currentWeather.main.temp);
  const feelsLike = Math.round(currentWeather.main.feels_like);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg mb-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <MapPin className="text-gray-600 mr-2" size={20} />
          <h2 className="text-2xl font-bold text-gray-800">{currentWeather.name}, {currentWeather.sys.country}</h2>
        </div>
        <p className="text-gray-600 capitalize">{currentWeather.weather[0].description}</p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <WeatherIcon className="text-yellow-500 mr-4" size={80} />
        <div>
          <div className="text-4xl font-bold text-gray-800">{temp}{unitSymbol}</div>
          <div className="text-gray-600">Feels like {feelsLike}{unitSymbol}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <Droplets className="text-blue-500 mr-2" size={20} />
            <span className="text-gray-600 text-sm">Humidity</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{currentWeather.main.humidity}%</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <Wind className="text-green-500 mr-2" size={20} />
            <span className="text-gray-600 text-sm">Wind Speed</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{currentWeather.wind.speed} m/s</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <Eye className="text-purple-500 mr-2" size={20} />
            <span className="text-gray-600 text-sm">Visibility</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{(currentWeather.visibility / 1000).toFixed(1)} km</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <Thermometer className="text-red-500 mr-2" size={20} />
            <span className="text-gray-600 text-sm">Pressure</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{currentWeather.main.pressure} hPa</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;