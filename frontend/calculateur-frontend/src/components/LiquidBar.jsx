import React from 'react';

const LiquidBar = ({ label, percentage, height = 100, width = 50, color = "#4e8cff" }) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div style={{ margin: '10px', textAlign: 'center' }}>
      <div style={{
        height,
        width,
        border: '2px solid #333',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        background: '#eee',
        margin: '0 auto'
      }}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          height: `${clamped}%`,
          width: '100%',
          backgroundColor: color,
          transition: 'height 0.5s ease'
        }} />
      </div>
      <div style={{ marginTop: 5 }}>{label}</div>
    </div>
  );
};

export default LiquidBar;
