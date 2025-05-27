import React from 'react';
import { WeatherProvider } from './context/WeatherContext.jsx';
import WeatherDashboard from './components/layout/WeatherDashboard.jsx';

const App = () => {
  return (
    <WeatherProvider>
      <WeatherDashboard />
    </WeatherProvider>
  );
};

export default App;