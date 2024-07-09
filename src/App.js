import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForeCastWeather';
import { fetchCurrentWeather, fetchWeatherForecast } from './components/WeatherService';
import LineChart from './components/LineChart';
import './App.css'; // Import the CSS file
import UserProfile from './components/UserProfile';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [currentCity, setCurrentCity] = useState('');

  const handleSearch = async (city) => {
    try {
      const weatherData = await fetchCurrentWeather(city);
      const forecastData = await fetchWeatherForecast(city);
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setCurrentCity(city);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <Container className="weather-dashboard">
      <Typography variant="h3" align="center" gutterBottom>
        Weather Dashboard
      </Typography>
      <Grid container spacing={3} className="custom-grid">
        <Grid item xs={12} className="grid-item search-bar">
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <Grid item xs={4} className="grid-item user-profile">
          <UserProfile onSelectCity={handleSearch} />
        </Grid>
        <Grid item xs={4} className="grid-item weather-card">
          {currentWeather && <CurrentWeather weather={currentWeather} />}
        </Grid>
        <Grid item xs={8} className="grid-item  forecast-weather">
          {forecast && <ForecastWeather forecast={forecast} />}
        </Grid>
        <Grid item xs={12} className="grid-item chart-container">
          {forecast && <LineChart city={currentCity} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
