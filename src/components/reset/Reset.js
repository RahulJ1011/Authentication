import axios from 'axios';
import React, { useState } from 'react';
import './reset.css';

const Reset = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        'http://localhost:4000/api/reset',
        {
          Email,
          Password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  }

  return (
    <div className='reset-main'>
      <div className='reset-container'>
        <form onSubmit={handleSubmit}>
          <input 
            type='email'
            placeholder='Enter your registered Email'
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type='password'
            placeholder='Reset Password'
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default Reset;
