import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import './SignupPage.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username,
        password,
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erreur lors de l’inscription');
    }
  };

  return (
    <MDBContainer fluid className="signup-container">
      <MDBCard className="signup-card">
        <div className="card-left">
          <MDBCardImage 
            src='https://www.ihconstruction.com/wp-content/uploads/2011/11/red-paint.jpg' 
            alt="signup form" 
            className='signup-image' 
          />
        </div>
        <div className="card-right">
          <MDBCardBody className='d-flex flex-column justify-content-center align-items-center'>

            <div className='d-flex flex-row mb-3'>
              <MDBIcon fas icon="user-plus fa-3x me-3" style={{ color: '#ff6219' }} />
              <span className="h1 fw-bold mb-0">Register</span>
            </div>

            <h5 className="fw-normal mb-4 pb-3" style={{ letterSpacing: '1px' }}>
              Créer un nouveau compte
            </h5>

            <MDBInput 
              wrapperClass='mb-4 styled-input' 
              placeholder="Nom d’utilisateur" 
              type="text" 
              size="lg" 
              value={username}
              onChange={e => setUsername(e.target.value)}
            />

            <MDBInput 
              wrapperClass='mb-4 styled-input' 
              placeholder="Mot de passe" 
              type="password" 
              size="lg" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <MDBInput 
              wrapperClass='mb-4 styled-input' 
              placeholder="Confirmez le mot de passe" 
              type="password" 
              size="lg" 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <MDBBtn className="mb-4 px-5 styled-button" size="lg" onClick={handleSignup}>
              S'inscrire
            </MDBBtn>

            {message && <p style={{ color: 'red' }}>{message}</p>}

            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
              Vous avez déjà un compte? <Link to="../" style={{ color: '#393f81' }}>Connectez-vous ici</Link>
            </p>

          </MDBCardBody>
        </div>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignupPage;
