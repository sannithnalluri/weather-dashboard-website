import moment from 'moment';


const API_KEY = "72904ebc599e35a6f604882e58b85e11" 
const API_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};


export const fetchWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Weather forecast not found');
    }
    
    const data = await response.json(); 

    const filteredData = data.list.filter(item => {
      return moment(item.dt_txt).format('HH:mm:ss') === '09:00:00' && moment(item.dt_txt).isSameOrAfter(moment(), 'day');
    });

    const forecastData = filteredData.map(item => ({
      date: moment(item.dt_txt).format('YYYY-MM-DD'), 
      temperature: item.main.temp, 
      weather: item.weather[0].main, 
      clouds: item.clouds.all,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      windSpeed: item.wind.speed,
    }));

    console.log(forecastData);
    return forecastData;
  } catch (error) {
    throw new Error('Failed to fetch weather forecast');
  }
};