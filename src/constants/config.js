// src/constants/config.js
// API Configuration for Vite
export const API_KEY = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY || 'your_api_key_here';
export const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
export const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds