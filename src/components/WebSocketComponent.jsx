import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';  // Automatically registers all the Chart.js components

const WebSocketComponent = () => {
  const [temperatures, setTemperatures] = useState([]);  // State to store temperatures
  const [timestamps, setTimestamps] = useState([]);  // State to store timestamps
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    // Create a new WebSocket connection
    const ws = new WebSocket('ws://localhost:8000/ws');  // Use the correct IP of the server

    // On WebSocket open
    ws.onopen = () => {
      setConnectionStatus('Connected');
    };

    // On receiving a message
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);  // Assuming the data is JSON

      // Check if the message is a temperature message
      if (message.type === 'temperature') {
        const newTemperature = message.value;
        const timestamp = new Date().toLocaleTimeString();

        setTemperatures((prevTemperatures) => [...prevTemperatures, newTemperature]);
        setTimestamps((prevTimestamps) => [...prevTimestamps, timestamp]);
      }
    };

    // On WebSocket error
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
    };

    // On WebSocket close
    ws.onclose = () => {
      setConnectionStatus('Disconnected');
    };

    // Cleanup the WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  // Chart.js data configuration
  const data = {
    labels: timestamps,  // Timestamps for the x-axis
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,  // Temperature values for the y-axis
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',  // Line color
        tension: 0.1,  // Curved line
      },
    ],
  };

  // Chart.js options configuration
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Temperature (°C)',  // Y-axis label
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',  // X-axis label
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>WebSocket Status: {connectionStatus}</h2>
      <div style={{ height: '400px', width: '100%' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WebSocketComponent;
