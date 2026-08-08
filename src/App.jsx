import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import StudentPortal from './StudentPortal';
import HodPanel from './HodPanel';
import GuardVerification from './GuardVerification';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* DEMO NAVIGATION BAR */}
        <nav style={{ 
          backgroundColor: '#1f2937', 
          padding: '15px 30px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ color: 'white', margin: 0, fontSize: '20px' }}>AZURA Smart Outpass</h1>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={linkStyle}>Student Portal</Link>
            <Link to="/hod" style={linkStyle}>HOD Dashboard</Link>
            <Link to="/guard" style={linkStyle}>Guard Check</Link>
          </div>
        </nav>

        {/* PAGE ROUTING */}
        <div style={{ padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<StudentPortal />} />
            <Route path="/hod" element={<HodPanel />} />
            <Route path="/guard" element={<GuardVerification />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

// Simple style for our navigation links
const linkStyle = {
  color: '#e5e7eb',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '8px 12px',
  borderRadius: '6px',
  transition: 'background-color 0.2s'
};

export default App;