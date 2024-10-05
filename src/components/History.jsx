import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled(motion.div)`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Title = styled(motion.h2)`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const InfoItem = styled(motion.div)`
  flex-basis: calc(20% - 1rem);
  min-width: 200px;
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  margin: 0.5rem;
`;

const Label = styled.p`
  font-weight: 600;
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.p`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
  font-weight: 500;
`;

const Input = styled(motion.input)`
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  width: 150px;
  border-radius: 8px;
  border: 2px solid #e1e4e8;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Table = styled(motion.table)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Th = styled.th`
  padding: 1rem;
  background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  text-align: center;
  transition: all 0.2s ease;

  tr:last-child & {
    border-bottom: none;
  }
`;

const TableRow = styled(motion.tr)`
  background-color: white;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const Message = styled(motion.p)`
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
  
  ${props => props.type === 'error' && `
    color: #dc3545;
    background-color: #ffe5e5;
  `}
  
  ${props => props.type === 'success' && `
    color: #28a745;
    background-color: #e5ffe5;
  `}
`;

const History = () => {
  const { rfid } = useParams();
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [newBalance, setNewBalance] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8000/get_user/${rfid}`);
        setUser(userResponse.data[0]);

        const historyResponse = await axios.get(`http://localhost:8000/get_history/${rfid}`);
        setHistory(historyResponse.data);
      } catch (err) {
        setError('Failed to fetch user info or history.');
      }
    };
    fetchUserInfo();
  }, [rfid]);

  const handleBalanceUpdate = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/set_balance/${rfid}/${newBalance}`);
      if (response.data.message === 'Balance updated successfully') {
        setSuccess('Balance updated successfully.');
        setError('');
        const userResponse = await axios.get(`http://localhost:8000/get_user/${rfid}`);
        setUser(userResponse.data[0]);
        setNewBalance('');
      }
    } catch (err) {
      setError('Failed to update balance.');
      setSuccess('');
    }
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        User Information and History
      </Title>

      <AnimatePresence>
        {error && (
          <Message
            type="error"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {error}
          </Message>
        )}
        {success && (
          <Message
            type="success"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {success}
          </Message>
        )}
      </AnimatePresence>

      {user && (
        <InfoContainer
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InfoItem>
            <Label>ID</Label>
            <Value>{user.id}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Name</Label>
            <Value>{user.nombre} {user.apellido}</Value>
          </InfoItem>
          <InfoItem>
            <Label>RFID</Label>
            <Value>{user.uid}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Balance</Label>
            <Value>${user.saldo}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Status</Label>
            <Value>{user.activa ? 'Inside' : 'Outside'}</Value>
          </InfoItem>
        </InfoContainer>
      )}

      <InfoContainer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <InfoItem style={{ display: 'flex', alignItems: 'center' }}>
          <Label>Set New Balance:</Label>
          <Input
            type="number"
            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
            placeholder="New Balance"
            whileFocus={{ scale: 1.02 }}
          />
          <Button
            onClick={handleBalanceUpdate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update Balance
          </Button>
        </InfoItem>
      </InfoContainer>

      <Table
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {history.length > 0 ? (
              history.map((entry, index) => (
                <TableRow
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Td>{entry.id}</Td>
                  <Td>{entry.fecha}</Td>
                  <Td>{entry.accion}</Td>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <Td colSpan="3">No history found for this user.</Td>
              </TableRow>
            )}
          </AnimatePresence>
        </tbody>
      </Table>
    </Container>
  );
};

export default History;