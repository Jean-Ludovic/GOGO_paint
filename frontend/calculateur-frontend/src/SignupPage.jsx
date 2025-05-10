import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username,
        password,
        confirmPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erreur lors de l’inscription');
    }
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      <input type="text" placeholder="Nom d’utilisateur" value={username} onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <input type="password" placeholder="Confirmez le mot de passe" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <br />
      <button onClick={handleSignup}>S'inscrire</button>
      <p>{message}</p>
    </div>
  );
}

export default SignupPage;
