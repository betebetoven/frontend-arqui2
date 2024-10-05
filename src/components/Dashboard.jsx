import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background: linear-gradient(180deg, #007bff 0%, #0056b3 100%);
  color: white;
  padding: 2rem;
  position: fixed;
  height: 100%;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;

const SidebarLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const ContentArea = styled(motion.div)`
  margin-left: 270px;
  padding: 2rem;
  flex-grow: 1;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  transition: background-color 0.3s ease;

  tr:last-child & {
    border-bottom: none;
  }

  tr:hover & {
    background-color: #f8f9fa;
  }
`;

const Message = styled(motion.p)`
  text-align: center;
  color: #dc3545;
  padding: 1rem;
  background-color: #ffe5e5;
  border-radius: 8px;
  margin-bottom: 1rem;
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

const TableRow = styled(motion.tr)`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get_users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <Sidebar>
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Menu
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SidebarLink to="/dashboard">Users</SidebarLink>
          <SidebarLink to="/add_user">Add User</SidebarLink>
          <SidebarLink to="/parking_status">Parking Status</SidebarLink>
          <SidebarLink to="/websocket">Temperature Monitoring</SidebarLink>
        </motion.div>
      </Sidebar>
      <ContentArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title>All Users</Title>
        <AnimatePresence>
          {error && (
            <Message
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error}
            </Message>
          )}
        </AnimatePresence>
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
            <AnimatePresence>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
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
                        <Button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Detail
                        </Button>
                      </Link>
                    </Td>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <Td colSpan="9">No users found.</Td>
                </TableRow>
              )}
            </AnimatePresence>
          </tbody>
        </Table>
        <Link to="/add_user">
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add New User
          </Button>
        </Link>
      </ContentArea>
    </DashboardLayout>
  );
};

export default Dashboard;