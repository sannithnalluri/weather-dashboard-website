import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto'; // Import Chart.js with auto registration
import moment from 'moment'; // Import moment for date formatting
import 'chartjs-adapter-moment'; // Import Chart.js Moment adapter
import { fetchWeatherForecast } from './WeatherService';

const LineChart = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherForecast(city);
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };

    fetchData();
  }, [city]);

  const chartData = {
    labels: forecastData.map(entry => moment(entry.date).format('YYYY-MM-DD')), // Format date as 'YYYY-MM-DD'
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecastData.map(entry => entry.temperature),
        borderColor: 'rgba(54, 162, 235, 1)', 
        backgroundColor: 'rgba(54, 162, 235, 0.2)', 
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', 
        pointHoverRadius: 7, 
        tension: 0.4, 
      },
    ],
  };

  const options = {
    responsive: true, 
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: true, // Show legend
        position: 'top', // Position of the legend (top, bottom, left, right)
        labels: {
          font: {
            size: 14, // Legend font size
          },
        },
      },
      title: {
        display: true,
        text: `Weather Forecast for ${city}`,
        font: {
          size: 18, // Title font size
          weight: 'bold', // Title font weight
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Temperature (°C)',
          font: {
            size: 16, // Y-axis title font size
          },
        },
        ticks: {
          font: {
            size: 12, // Y-axis tick font size
          },
        },
      },
      x: {
        type: 'time', // Use 'time' for date axes
        time: {
          unit: 'day', // Set time unit to 'day'
          tooltipFormat: 'YYYY-MM-DD', // Format for tooltip
          displayFormats: {
            day: 'YYYY-MM-DD', // Format for display on x-axis
          },
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 16, // X-axis title font size
          },
        },
        ticks: {
          font: {
            size: 12, // X-axis tick font size
          },
        },
        adapters: {
          date: {
            // Configure date adapter
            locale: moment.locale(),
          },
        },
      },
    },
  };
  return <Line data={chartData} options={options} width={500} height={500}/>;
};

export default LineChart;
