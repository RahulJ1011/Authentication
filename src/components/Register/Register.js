import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate()
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [show, setShow] = useState(false);
  const [Reshow,SetReShow] = useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:4000/api/register',{
      userName,
      email,
      password
    })
    console.log(response)
    navigate('/login')
  };
 

  return (
    <div className='main'>
       <div className='container'>
      <h1 className='heading'>SIGNUP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter your Username'
          required
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter your email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
       <div className='password'>
       <input
          type={show ? 'text' : 'password'}
          placeholder='Create Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => setShow(!show)}> {show ? 'Hide' : 'Show'} </button>
       </div>
       <div className='RePassword'>
       <input
          type='password'
          placeholder='Re-Enter Password'
          required
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <button
        
          type='button'
          onClick={()=> SetReShow(!Reshow)
          }>
            {Reshow ? "Hide" : "Show"}
          </button>
       </div>
        <button  type='submit' className='btn'>SIGNUP</button>
      </form>
      <h4>Already have an account <Link className='link' to={'/login'}>Click here</Link> </h4>
    </div>
    </div>
   
  );
};

export default Register;
