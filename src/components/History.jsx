import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
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

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  flex-basis: 30%;
`;

const Label = styled.p`
  font-weight: bold;
`;

const Value = styled.p`
  margin: 0;
`;

const Input = styled.input`
  padding: 8px;
  margin: 10px 0;
  width: 100px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
`;

const History = () => {
  const { rfid } = useParams(); // Get RFID from the URL
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);  // For storing user information
  const [newBalance, setNewBalance] = useState(''); // State for new balance input
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the user info and history
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8000/get_user/${rfid}`);
        setUser(userResponse.data[0]);  // Assuming that the user info is returned as an array with one object

        const historyResponse = await axios.get(`http://localhost:8000/get_history/${rfid}`);
        setHistory(historyResponse.data);
      } catch (err) {
        setError('Failed to fetch user info or history.');
      }
    };
    fetchUserInfo();
  }, [rfid]);

  // Handle updating the balance
  const handleBalanceUpdate = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/set_balance/${rfid}/${newBalance}`);
      if (response.data.message === 'Balance updated successfully') {
        setSuccess('Balance updated successfully.');
        setError('');
        // Refresh user info to show the new balance
        const userResponse = await axios.get(`http://localhost:8000/get_user/${rfid}`);
        setUser(userResponse.data[0]);
      }
    } catch (err) {
      setError('Failed to update balance.');
      setSuccess('');
    }
  };

  return (
    <Container>
      <Title>User Information and History</Title>

      {error && <p>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Display user information */}
      {user && (
        <InfoContainer>
          <InfoItem>
            <Label>ID:</Label>
            <Value>{user.id}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Name:</Label>
            <Value>{user.nombre} {user.apellido}</Value>
          </InfoItem>
          <InfoItem>
            <Label>RFID:</Label>
            <Value>{user.uid}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Balance:</Label>
            <Value>{user.saldo}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Status:</Label>
            <Value>{user.activa ? 'Inside' : 'Outside'}</Value>
          </InfoItem>
        </InfoContainer>
      )}

      {/* New Balance Input */}
      <InfoContainer>
        <InfoItem>
          <Label>Set New Balance:</Label>
          <Input
            type="number"
            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
            placeholder="New Balance"
          />
          <Button onClick={handleBalanceUpdate}>Update Balance</Button>
        </InfoItem>
      </InfoContainer>

      {/* Display history */}
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((entry, index) => (
              <tr key={index}>
                <Td>{entry.id}</Td>
                <Td>{entry.fecha}</Td>
                <Td>{entry.accion}</Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="3">No history found for this user.</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default History;
