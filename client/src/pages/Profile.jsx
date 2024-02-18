import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slice/authSlice';

function Profile() {
  const [disbaled, setDisable] = useState(true);
  const user = useSelector((state) => state.user).user;
  const [userData, setUserData] = useState(
    user.result
      ? {
          email: user?.result.email,
          userName: user?.result.username,
          image: user?.result.image,
        }
      : {}
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const style = { width: '50%', margin: 'auto' };

  const updateUserData = (title, value) => {
    const data = {
      ...userData,
      [title]: value,
    };
    setUserData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userData, user.result._id);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={style} className='mt-5'>
      <Form>
        <Form.Group className='text-center'>
          <div className='mx-4 mt-3 mx-auto mb-3' style={{ width: '120px' }}>
            <Image
              width={120}
              height={120}
              src={userData.image}
              roundedCircle
            />
          </div>

          {!disbaled && (
            <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }) =>
                setUserData({ ...userData, image: base64 })
              }
            />
          )}
        </Form.Group>
        <Form.Group className='my-5' controlId='formBasicUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={(e) => updateUserData(e.target.title, e.target.value)}
            title='userName'
            type='text'
            value={userData.userName}
            placeholder='Username'
            disabled={disbaled}
          />
        </Form.Group>
        <Button disabled={disbaled} onClick={handleSubmit}>
          Update Profile
        </Button>
        <span className='ms-3'>
          <Button onClick={() => setDisable((prev) => !prev)}>
            {disbaled ? 'Start Updating' : 'Stop Updating'}
          </Button>
        </span>
      </Form>
    </div>
  );
}

export default Profile;
