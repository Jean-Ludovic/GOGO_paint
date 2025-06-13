import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SurfaceCalculator from './components/SurfaceCalculator';
import ChatPage from './components/ChatPage';
import './Dashboard.css';

function Dashboard() {
  const username = localStorage.getItem('username');
  const [section, setSection] = useState('calcul');

  let content;
  if (section === 'calcul') content = <SurfaceCalculator />;
  else if (section === 'chat') content = <ChatPage />;

  return (
    <div className="dashboard-container">
      <Sidebar setSection={setSection} />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Bienvenue {username} !</h1>
        <div className="dashboard-card">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
