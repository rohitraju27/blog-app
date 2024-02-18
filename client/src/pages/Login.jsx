import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../api/api';
import { useDispatch } from 'react-redux';
import { login } from '../slice/authSlice';

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const style = { width: '50%', margin: 'auto' };

  const updateUserData = (title, value) => {
    const temp = {
      ...userData,
      [title]: value,
    };

    setUserData(temp);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signin(userData);
      if (data) {
        setError('');
        dispatch(login({ ...data }));
      }
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  return (
    <div style={style} className='mt-5'>
      <h1 className='mb-3'>Login</h1>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => updateUserData(e.target.title, e.target.value)}
            title='email'
            type='email'
            required
            placeholder='Enter email'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => updateUserData(e.target.title, e.target.value)}
            title='password'
            type='password'
            required
            placeholder='Password'
          />
        </Form.Group>
        {error && (
          <span className='d-block' style={{ color: 'red' }}>
            {error}
          </span>
        )}
        <Button variant='primary' type='submit' onClick={handleSubmit}>
          Submit
        </Button>

        <div>
          Not registered? <Link to='/signup'>Sign Up</Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
