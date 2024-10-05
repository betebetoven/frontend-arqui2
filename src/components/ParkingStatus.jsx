import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components for a better UI
const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 24px;
`;

const StatsBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  text-align: center;
`;

const StatItem = styled.p`
  font-size: 18px;
  color: #333;
`;

const PercentageBar = styled.div`
  background-color: #f1f1f1;
  border-radius: 10px;
  overflow: hidden;
  height: 30px;
  margin-top: 20px;
`;

const FillBar = styled.div`
  background-color: #007bff;
  width: ${(props) => props.percentage}%;
  height: 100%;
`;

const ParkingStatus = () => {
  const [parkingData, setParkingData] = useState(null); // State for parking data
  const [error, setError] = useState('');

  // Fetch parking status from the API
  useEffect(() => {
    const fetchParkingStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/parking_status');
        const data = response.data.status[0];
        setParkingData(data);
      } catch (err) {
        setError('Failed to fetch parking status.');
      }
    };

    fetchParkingStatus();
  }, []);

  // Calculate percentage of parking occupancy
  const calculatePercentage = (total, inside) => {
    return total > 0 ? (inside / total) * 100 : 0;
  };

  return (
    <Container>
      <Title>Parking Lot Status</Title>

      {error && <p>{error}</p>}

      {parkingData && (
        <>
          <StatsBox>
            <StatItem>Vehicles Inside: {parkingData.vehiculos_dentro}</StatItem>
            <StatItem>Total Spaces: {parkingData.total_espacios}</StatItem>
            <StatItem>
              Available Spaces: {parkingData.total_espacios - parkingData.vehiculos_dentro}
            </StatItem>
            <StatItem>
              Occupancy Percentage:{' '}
              {calculatePercentage(parkingData.total_espacios, parkingData.vehiculos_dentro).toFixed(2)}%
            </StatItem>

            <PercentageBar>
              <FillBar
                percentage={calculatePercentage(parkingData.total_espacios, parkingData.vehiculos_dentro)}
              />
            </PercentageBar>
          </StatsBox>
        </>
      )}
    </Container>
  );
};

export default ParkingStatus;
