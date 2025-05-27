import React from 'react';
import { useWeather } from '../../context/WeatherContext.jsx';
import { getWeatherIcon } from '../../utils/weatherIcons.js';

const ForecastComponent = () => {
  const { forecast, unit } = useWeather();

  if (!forecast.length) return null;

  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const WeatherIcon = getWeatherIcon(day.weather[0].main);
          const temp = Math.round(day.main.temp);
          
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-sm font-semibold text-gray-600 mb-2">
                {index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <WeatherIcon className="text-yellow-500 mx-auto mb-2" size={32} />
              <div className="text-lg font-bold text-gray-800">{temp}{unitSymbol}</div>
              <div className="text-xs text-gray-600 capitalize">{day.weather[0].description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastComponent;