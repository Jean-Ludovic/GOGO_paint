import React, { useState } from 'react';
import LiquidBar from './LiquidBar';
import './SurfaceCalculator.css';

function SurfaceCalculator() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('feet');
  const [area, setArea] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const COVER_PINTE = 100;
  const COVER_GALLON = 400;
  const COVER_CHAUDIERE = 2000;

  const convertToFeet = (value, unit) => {
    const val = parseFloat(value);
    if (unit === 'meters') return val * 3.28084;
    if (unit === 'inches') return val * 0.083333;
    return val;
  };

  const calculateOptimized = (area) => {
    let remaining = area;
    const chaudiere = Math.floor(remaining / COVER_CHAUDIERE);
    remaining %= COVER_CHAUDIERE;
    const gallon = Math.floor(remaining / COVER_GALLON);
    remaining %= COVER_GALLON;
    const pinte = Math.ceil(remaining / COVER_PINTE);

    return { chaudiere, gallon, pinte, remaining };
  };

  const calculate = () => {
    let baseArea = 0;
    let surfaceMsg = '';

    if (area) {
      baseArea = parseFloat(area);
      surfaceMsg = `Pour une superficie directe de ${baseArea.toFixed(2)} pi²`;
    } else if (length && height) {
      const l = convertToFeet(length, unit);
      const h = convertToFeet(height, unit);
      baseArea = l * h;
      surfaceMsg = `Pour une longueur de ${length} ${unit} et une hauteur de ${height} ${unit}, la superficie est de ${baseArea.toFixed(2)} pi²`;
    } else {
      alert('Veuillez remplir soit la longueur et la hauteur, soit la superficie directe.');
      return;
    }

    const couche1 = baseArea;
    const couche2 = baseArea * 2;

    const computeData = (a) => {
      const raw = {
        chaudiere: a / COVER_CHAUDIERE,
        gallon: a / COVER_GALLON,
        pinte: a / COVER_PINTE
      };

      const proposal = calculateOptimized(a);

      return { baseArea: a.toFixed(2), raw, proposal };
    };

    setMessage(surfaceMsg);
    setResult({ couche1: computeData(couche1), couche2: computeData(couche2) });

    setLength('');
    setHeight('');
    setUnit('feet');
    setArea('');
  };

  const renderBars = (raw) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
      <LiquidBar label={`Chaudière (${raw.chaudiere.toFixed(2)})`} percentage={raw.chaudiere * 100} height={120} width={50} color="red" />
      <LiquidBar label={`Gallon (${raw.gallon.toFixed(2)})`} percentage={raw.gallon * 100} height={100} width={40} color="red" />
      <LiquidBar label={`Pinte (${raw.pinte.toFixed(2)})`} percentage={raw.pinte * 100} height={80} width={30} color="red" />
    </div>
  );

  const renderOptimized = (proposal) => (
    <div>
      <div style={{ fontWeight: 'bold', marginTop: '1rem' }}>
        Résultat optimisé :&nbsp;
        {[proposal.chaudiere > 0 ? `${proposal.chaudiere} chaudière(s)` : null,
          proposal.gallon > 0 ? `${proposal.gallon} gallon(s)` : null,
          proposal.pinte > 0 ? `${proposal.pinte} pinte(s)` : null
        ].filter(Boolean).join(' + ')}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '1rem' }}>
        {proposal.chaudiere > 0 && (
          <div>
            <LiquidBar label="Chaudière" percentage={100} height={120} width={50} color="red" />
            <p style={{ textAlign: 'center', marginTop: '-10px' }}>1 Chaudière pleine</p>
          </div>
        )}
        {proposal.gallon > 0 && (
          <div>
            <LiquidBar label="Gallon" percentage={100} height={100} width={40} color="red" />
            <p style={{ textAlign: 'center', marginTop: '-10px' }}>{proposal.gallon} Gallon(s)</p>
          </div>
        )}
        {proposal.pinte > 0 && (
          <div>
            <LiquidBar label="Pinte" percentage={100} height={80} width={30} color="red" />
            <p style={{ textAlign: 'center', marginTop: '-10px' }}>{proposal.pinte} Pinte(s)</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <h2>Calculateur de surface – Magasin de peinture</h2>

<div className="form-container">
  <div className="form-row">
    <label>Unité :</label>
    <select value={unit} onChange={(e) => setUnit(e.target.value)}>
      <option value="feet">Pieds</option>
      <option value="inches">Pouces</option>
      <option value="meters">Mètres</option>
    </select>
  </div>

  <div className="form-row">
    <label>Longueur :</label>
    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
  </div>

  <div className="form-row">
    <label>Hauteur :</label>
    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
  </div>

  <div className="form-row">
    <label>Superficie directe (pi²) :</label>
    <input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
  </div>

  <button className="calculate-btn" onClick={calculate}>Calculer</button>
</div>


      {result && (
        <div style={{ marginTop: '1rem' }}>
          <p>{message}</p>
          <hr />
          <h4>Pour 1 couche</h4>
          {renderBars(result.couche1.raw)}
          {renderOptimized(result.couche1.proposal)}
          <hr style={{ marginTop: '2rem' }} />
          <h4>Pour 2 couches</h4>
          {renderBars(result.couche2.raw)}
          {renderOptimized(result.couche2.proposal)}
        </div>
      )}
    </div>
  );
}

export default SurfaceCalculator;
""
