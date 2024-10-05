import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const AddUser = () => {
  const [uid, setUid] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [id, setId] = useState('');
  const [model, setModel] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.50.145:8000/add_user', {
        uid,
        nombre,
        apellido,
        id,
        model,
      });
      if (response.data.message === 'User created successfully') {
        setSuccess('User added successfully.');
        setError('');
      }
    } catch (err) {
      setError('Failed to add user.');
      setSuccess('');
    }
  };

  return (
    <Container>
      <h2>Add New User</h2>
      <Form onSubmit={handleAddUser}>
        <Input
          type="text"
          placeholder="UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="First Name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Add User</Button>
      </Form>
    </Container>
  );
};

export default AddUser;
