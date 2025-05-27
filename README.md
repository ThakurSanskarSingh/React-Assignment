# Weather Dashboard

A responsive weather app built with React that displays current weather and 5-day forecast for any city.

## Features

-  Current weather conditions
-  5-day weather forecast
-  Temperature in Celsius/Fahrenheit
-  Wind speed, humidity, visibility, and pressure
-  Auto-refresh every 30 seconds
-  Mobile responsive design

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ThakurSanskarSingh/React-Assignment.git
   cd React-Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key

4. **Configure environment**
   - Create `.env` file in project root
   - Add your API key:
   ```
   VITE_REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

5. **Run the app**
   ```bash
   npm run dev
   ```

## Usage

1. Enter a city name in the search box
2. View current weather conditions
3. Check the 5-day forecast
4. Toggle between Celsius and Fahrenheit
5. Weather data auto-refreshes every 30 seconds

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons
- OpenWeatherMap API

