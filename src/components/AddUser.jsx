import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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

const FormCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Input = styled(motion.input)`
  padding: 0.75rem 1rem;
  border: 2px solid #e1e4e8;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    background: white;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem;
  background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
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

const Message = styled(motion.p)`
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
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

const inputFields = [
  { name: 'uid', label: 'UID', placeholder: 'Enter UID' },
  { name: 'nombre', label: 'First Name', placeholder: 'Enter first name' },
  { name: 'apellido', label: 'Last Name', placeholder: 'Enter last name' },
  { name: 'id', label: 'ID', placeholder: 'Enter ID' },
  { name: 'model', label: 'Model', placeholder: 'Enter model' }
];

const AddUser = () => {
  const [formData, setFormData] = useState({
    uid: '',
    nombre: '',
    apellido: '',
    id: '',
    model: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/add_user', formData);
      if (response.data.message === 'User created successfully') {
        setSuccess('User added successfully.');
        setError('');
        // Clear form
        setFormData({
          uid: '',
          nombre: '',
          apellido: '',
          id: '',
          model: ''
        });
      }
    } catch (err) {
      setError('Failed to add user.');
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
        Add New User
      </Title>
      
      <FormCard
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Form onSubmit={handleAddUser}>
          {inputFields.map((field, index) => (
            <InputGroup
              key={field.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                whileFocus={{ scale: 1.01 }}
              />
            </InputGroup>
          ))}

          <AnimatePresence>
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
          </AnimatePresence>

          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add User
          </Button>
        </Form>
      </FormCard>
    </Container>
  );
};

export default AddUser;