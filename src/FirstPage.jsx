import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecondPage from './SecondPage';


const FirstPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {

    localStorage.setItem('userData', JSON.stringify(formData));

    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please enter all the details');
      return;
    }
    navigate('/second');
    
  };

  return (
    <Container maxWidth="sm">
      <h2>Enter Your Information</h2>
      <form>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FirstPage;
