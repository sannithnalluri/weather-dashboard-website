import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Button, Typography, List, ListItem, CircularProgress } from '@mui/material';
import { fetchCurrentWeather } from './WeatherService'; // Import your weather fetching service

const UserProfile = ({ onSelectCity }) => {
  const [favoriteCity, setFavoriteCity] = useState('');
  const [newCity, setNewCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load favorite city from local storage when the component mounts
    const storedCity = localStorage.getItem('favoriteCity') || '';
    setFavoriteCity(storedCity);

    // Fetch weather data for the favorite city
    if (storedCity) {
      fetchWeatherForCity(storedCity);
    }
  }, []);

  const fetchWeatherForCity = async (city) => {
    setLoading(true);
    try {
      const data = await fetchCurrentWeather(city);
      setWeatherData({
        [city]: {
          temp: data.main.temp !== 'N/A' ? data.main.temp : 'N/A',
          weather: data.weather[0].main !== 'N/A' ? data.weather[0].main : 'N/A'
        }
      });
    } catch (error) {
      console.error('Error fetching weather data for favorite city:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavoriteCity = () => {
    if (newCity && newCity !== favoriteCity) {
      setFavoriteCity(newCity);
      localStorage.setItem('favoriteCity', newCity);
      setNewCity('');
      fetchWeatherForCity(newCity);
    }
  };

  const removeFavoriteCity = () => {
    setFavoriteCity('');
    localStorage.removeItem('favoriteCity');
    setWeatherData({});
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Favorite Place
        </Typography>
        {favoriteCity?"":<>
            <TextField
          label="Add Favorite City"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
        <Button onClick={addFavoriteCity} variant="contained" color="primary">
          Add
        </Button></>
        
        }
        {favoriteCity && (
            <>
           <Typography>{favoriteCity}</Typography>
            <Button onClick={removeFavoriteCity} variant="contained" color="secondary">
            Remove
          </Button></>
          
        )}
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          favoriteCity && (
            <Typography variant="body2">
              {`Temp: ${weatherData[favoriteCity].temp}°C, ${weatherData[favoriteCity].weather}`}
            </Typography>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
