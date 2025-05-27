import { Sun, Moon, CloudRain, Cloud, CloudSnow } from 'lucide-react';

// Weather icon mapping
export const getWeatherIcon = (weatherMain, isDay = true) => {
  const iconMap = {
    Clear: isDay ? Sun : Moon,
    Clouds: Cloud,
    Rain: CloudRain,
    Snow: CloudSnow,
    Drizzle: CloudRain,
    Thunderstorm: CloudRain,
    Mist: Cloud,
    Fog: Cloud,
    Haze: Cloud
  };
  
  return iconMap[weatherMain] || Cloud;
};