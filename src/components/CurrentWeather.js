// CurrentWeather.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CurrentWeather = ({ weather }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Current Weather
        </Typography>
        <Typography variant="body1">
          Temperature: {weather.main.temp}°C
        </Typography>
        <Typography variant="body1">Humidity: {weather.main.humidity}%</Typography>
        <Typography variant="body1">
          Wind Speed: {weather.wind.speed} m/s
        </Typography>
        <Typography variant="body1">
          Weather Condition: {weather.weather[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
