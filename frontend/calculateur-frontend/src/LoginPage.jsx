import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', response.data.username);
      navigate('/dashboard');
    } catch (error) {
      setErrorMsg('Nom d’utilisateur ou mot de passe invalide');
    }
  };

  return (
    <MDBContainer fluid className="login-container">
      <MDBCard className="login-card">
        <div className="card-left">
          <MDBCardImage 
            src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' 
            alt="login form" 
            className='login-image' 
          />
        </div>
        <div className="card-right">
          <MDBCardBody className='d-flex flex-column justify-content-center align-items-center'>

            <div className='d-flex flex-row mb-3'>
              <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
              <span className="h1 fw-bold mb-0">Logo</span>
            </div>

            <h5 className="fw-normal mb-4 pb-3" style={{ letterSpacing: '1px' }}>
              Sign into your account
            </h5>

            <MDBInput 
              wrapperClass='mb-4 styled-input' 
              placeholder='Email address' 
              id='formControlLg' 
              type='text' 
              size="lg" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput 
              wrapperClass='mb-4 styled-input' 
              placeholder='Password' 
              id='formControlLg' 
              type='password' 
              size="lg" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <MDBBtn className="mb-4 px-5 styled-button" size='lg' onClick={handleLogin}>
              LOGIN
            </MDBBtn>

            {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

            
            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
              Don't have an account? <Link to="/signup" style={{ color: '#393f81' }}>Register here</Link>
            </p>


          </MDBCardBody>
        </div>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginPage;
