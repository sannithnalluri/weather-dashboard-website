import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './ForeCastWeather.css'; // Import the CSS file

const ForecastWeather = ({ forecast }) => {
  return (
    <Card className="forecast-card">
      <CardContent className="forecast-content">
        <Typography variant="h5" gutterBottom>
          5-Day Forecast
        </Typography>
        <div className="forecast-items">
          {forecast.map((item, index) => (
            <div
              key={index}
              className={`forecast-item ${index % 2 === 0 ? 'even' : 'odd'}`}
            >
              <Typography variant="body1">
                Date: {item.date}
              </Typography>
              <Typography variant="body1">
                Temperature: {item.temperature}°C
              </Typography>
              <Typography variant="body1">
                Weather Condition: {item.weather}
              </Typography>
              <Typography variant="body1">
                Cloudiness: {item.clouds}%
              </Typography>
              <Typography variant="body1">
                Humidity: {item.humidity}%
              </Typography>
              <Typography variant="body1">
                Pressure: {item.pressure} hPa
              </Typography>
              <Typography variant="body1">
                Wind Speed: {item.windSpeed} m/s
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastWeather;
