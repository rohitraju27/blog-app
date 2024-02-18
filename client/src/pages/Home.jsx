import React, { useEffect } from 'react';
import Blogs from '../components/Blogs/Blogs';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../slice/authSlice';

function Home() {
  const user = useSelector((state) => state.user).user;
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('profile')) {
      dispatch(setUser(JSON.parse(localStorage.getItem('profile'))));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Blogs />
      {user.token && (
        <span className='ms-3'>
          <Link to='/create-blog'>
            <Button>Create Blog</Button>
          </Link>
        </span>
      )}
    </>
  );
}

export default Home;
