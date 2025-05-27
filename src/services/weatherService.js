// src/services/weatherService.js
// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';

export const API_KEY = '5b8628c26dba5db20294272370bc2e60'; // Replace with actual API key
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class weatherService {
  async getCurrentWeather(city, unit = 'metric') {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key. Please check your configuration.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again later.');
        }
      }
      
      return await response.json();
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
  }

  async getForecast(city, unit = 'metric') {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found for forecast data.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key for forecast data.');
        } else {
          throw new Error('Failed to fetch forecast data.');
        }
      }
      
      return await response.json();
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error while fetching forecast.');
      }
      throw error;
    }
  }

  async getWeatherByCoordinates(lat, lon, unit = 'metric') {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data for your location.');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch weather data for your location.');
    }
  }
}

export default new weatherService();