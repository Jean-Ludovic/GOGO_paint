import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
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
    <div>
      <h2>Connexion</h2>
      <input
        type="text"
        placeholder="Nom d’utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Se connecter</button>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <p>Pas encore de compte ? <Link to="/signup">Créer un compte</Link></p>
    </div>
  );
}

export default LoginPage;
