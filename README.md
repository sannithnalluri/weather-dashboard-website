
# Weathe forecast Dashboard

The Weather Dashboard Project aims to create an interactive and user-friendly application that provides real-time weather information and forecasts for different cities worldwide. The dashboard will feature a clean and responsive design, utilizing modern web technologies such as React and Material-UI, and will integrate with a weather API (e.g., OpenWeatherMap) to fetch up-to-date weather data. Users will have the ability to search for cities, view current weather conditions, a 7-day forecast, and manage their favorite city for quick access to weather information.
## Installation

Install my-project with npm

```bash
  npm install weather-dashboard
  cd weather-dashboard
```
Install necessary packages:
```bash
 npm install @mui/material @emotion/react @emotion/styled axios recharts
```
Project Structure
```bash
 weather-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── WeatherCard.js
│   │   ├── SearchBar.js
│   │   ├── WeatherChart.js
│   ├── services/
│   │   ├── WeatherService.js
│   ├── App.js
│   ├── index.js
└── package.json
```
Run the Application
```bash
 npm start
```

## How to use

How to Use
Search for a City:

Use the search bar to type in the name of a city and click the "Search" button.
The current weather and a 5-day forecast for the city will be displayed.
View Weather Data:

The weather card shows current weather information, including temperature, humidity, and weather conditions.
The weather chart displays the 5-day forecast with temperature trends.