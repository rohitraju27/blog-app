import React, { useEffect } from 'react';
import { Navbar, Container, Button, Image } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { logout } from '../slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Nav = () => {
  const user = useSelector((state) => state.user).user;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStyle = { textDecoration: 'none', color: 'white' };

  function onLogout() {
    dispatch(logout());
  }

  function onImageClick() {
    navigate('/profile');
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) onLogout();
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    !['/login', '/signup'].includes(location.pathname) && (
      <Navbar className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='/'>BlogBook</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            {user?.token ? (
              <div className='d-flex'>
                <div className='me-3 d-flex align-items-center'>
                  <Navbar.Text>
                    {`Signed in as: ${user?.result.username}`}
                  </Navbar.Text>
                </div>
                <Image
                  src={user.result.image}
                  roundedCircle
                  width={50}
                  height={50}
                  onClick={onImageClick}
                  style={{ cursor: 'pointer' }}
                />
                <Button
                  className='ms-3'
                  variant='danger'
                  onClick={() => onLogout()}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className='d-flex'>
                <Button>
                  <Link style={loginStyle} to='/login'>
                    Login
                  </Link>
                </Button>
                <div className='ms-3'>
                  <Button>
                    <Link style={loginStyle} to='/signup'>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
};

export default Nav;
