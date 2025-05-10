import React from 'react';

function Sidebar({ setSection }) {
  return (
    <div style={{ width: '200px', background: '#222', color: 'white', padding: '1rem', height: '100vh' }}>
      <h3>Tableau de bord</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '1rem 0', cursor: 'pointer' }} onClick={() => setSection('calcul')}>
          🧮 Calculateur
        </li>
        <li style={{ margin: '1rem 0', cursor: 'pointer' }} onClick={() => setSection('chat')}>
          💬 Chat
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
