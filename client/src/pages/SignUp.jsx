import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import FileBase from 'react-file-base64';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../api/api';
import { login } from '../slice/authSlice';

function SignUp() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    userName: '',
    image: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const style = { width: '50%', margin: 'auto' };

  const updateUserData = (title, value) => {
    const temp = {
      ...userData,
      [title]: value,
    };

    setUserData(temp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup(userData);
      if (data) {
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
      <h1 className='mb-3'>Sign Up</h1>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => updateUserData(e.target.title, e.target.value)}
            title='email'
            type='email'
            placeholder='Enter email'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => updateUserData(e.target.title, e.target.value)}
            title='password'
            type='password'
            placeholder='Password'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => updateUserData(e.target.title, e.target.value)}
            title='userName'
            type='text'
            placeholder='Username'
          />
        </Form.Group>

        <FileBase
          type='file'
          multiple={false}
          onDone={({ base64 }) => setUserData({ ...userData, image: base64 })}
        />

        {error && (
          <span className='d-block' style={{ color: 'red' }}>
            {error}
          </span>
        )}

        <Button variant='primary' type='submit' onClick={handleSubmit}>
          Submit
        </Button>

        <div>
          Have an account? <Link to='/login'>Log In</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
