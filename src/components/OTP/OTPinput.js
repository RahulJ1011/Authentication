import React, { useRef, useState } from 'react';
import './otpinput.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPinput = () => {
  const navigate = useNavigate()
  const length = 6;
  const [otp, setOTP] = useState(new Array(length).fill(''));
  const Refs = useRef([]);

  const handleChange = (index, e) => {
    const { value } = e.target;
    const newOTP = [...otp];
    newOTP[index] = value.substring(value.length - 1);
    setOTP(newOTP);

    const combinedOtp = newOTP.join('');
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    if (value && index < length - 1 && Refs.current[index + 1]) {
      Refs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    Refs.current[index].setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      Refs.current[otp.indexOf('')].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && Refs.current[index - 1]) {
      Refs.current[index - 1].focus();
    }
  };

  const onOtpSubmit = async (combinedOTP) => {
    try {
      const {msg,status} = await axios.post('http://localhost:4000/api/verifyOTP', {
        combinedOTP
      });
      console.log(msg)
      if(status === 201)
      {
        navigate('/resetPassword')
      }
      
    } catch (error) {
      console.error('Error submitting OTP:', error);
    
    }
  };
  return (
    <>
    <h4>Enter OTP to ResetPassword</h4>
     <div className='otp-container'>
    
    {otp.map((value, index) => (
     
        <input
        className='otp'
        key={index}
        type='text'
        ref={(input) => (Refs.current[index] = input)}
        value={value}
        onChange={(e) => handleChange(index, e)}
        onClick={() => handleClick(index)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        maxLength={1}
      />
      
    ))}
  </div>
    </>
   
  );
};

export default OTPinput;
