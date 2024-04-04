import React, { useState } from 'react';
import './forgot.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const userName = localStorage.getItem('userName');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !userName) {
      alert('Please enter your email address and username.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/forgotpassword', {
        email,
        userName,
      });
      console.log(res);
      navigate('/verifyOtp');
    } catch (error) {
      console.error('Error submitting forgot password request:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='forgot-main'>
      <div className='forgot-container'>
        <h1 className='forgot-heading'>Enter Your Email address</h1>
        <form onSubmit={handleSubmit}>
          <input
            className='email'
            type='email'
            placeholder='Enter Your Email address'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className='forgot-btn' type='submit' disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
