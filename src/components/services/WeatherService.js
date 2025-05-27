import { API_KEY, BASE_URL } from '../constants/config.js';

// Weather service functions
export const WeatherService = {
  getCurrentWeather: async (city, unit = 'metric') => {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`);
    if (!response.ok) {
      throw new Error(response.status === 404 ? 'City not found' : 'Failed to fetch weather data');
    }
    return response.json();
  },

  getForecast: async (city, unit = 'metric') => {
    const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    return response.json();
  }
};