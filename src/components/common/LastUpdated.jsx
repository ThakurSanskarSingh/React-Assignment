import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext.jsx';


const LastUpdated = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { currentWeather } = useWeather();

  useEffect(() => {
    if (currentWeather) {
      setLastUpdated(new Date());
    }
  }, [currentWeather]);

  if (!currentWeather) return null;

  return (
    <div className="text-center text-sm text-gray-500 mt-4">
      <Clock className="inline mr-1" size={14} />
      Last updated: {lastUpdated.toLocaleTimeString()}
    </div>
  );
};

export default LastUpdated;