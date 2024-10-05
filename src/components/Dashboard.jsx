import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Styled components
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

const Message = styled.p`
  text-align: center;
  color: red;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch all users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.50.145:8000/get_users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container>
      <Title>All Users</Title>
      {error && <Message>{error}</Message>}
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Last Name</Th>
            <Th>RFID</Th>
            <Th>Balance</Th>
            <Th>Status</Th>
            <Th>Ingreso</Th>
            <Th>Salida</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.nombre}</Td>
                <Td>{user.apellido}</Td>
                <Td>{user.uid}</Td>
                <Td>{user.saldo}</Td>
                <Td>{user.activa ? 'Adentro' : 'Afuera'}</Td>
                <Td>{user.ultima_entrada}</Td>
                <Td>{user.ultima_salida}</Td>
                <Td>
                  <Link to={`/history/${user.uid}`}>
                    <Button>Detail</Button>
                  </Link>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="9">No users found.</Td>
            </tr>
          )}
        </tbody>
      </Table>
      <Link to="/add_user">
        <Button>Add New User</Button>
      </Link>
    </Container>
  );
};

export default Dashboard;
