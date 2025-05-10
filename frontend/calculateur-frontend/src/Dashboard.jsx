import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SurfaceCalculator from './components/SurfaceCalculator';
import ChatPage from './components/ChatPage';

function Dashboard() {
  const username = localStorage.getItem('username');
  const [section, setSection] = useState('calcul'); // valeur par défaut

  let content;
  if (section === 'calcul') content = <SurfaceCalculator />;
  else if (section === 'chat') content = <ChatPage />;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setSection={setSection} />
      <div style={{ flex: 1, padding: '2rem' }}>
        <h1>Bienvenue {username} !</h1>
        {content}
      </div>
    </div>
  );
}

export default Dashboard;
