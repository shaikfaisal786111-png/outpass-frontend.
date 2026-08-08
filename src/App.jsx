import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentPortal from './StudentPortal';
import HodPanel from './HodPanel';
import GuardVerification from './GuardVerification';

// --- SECURITY WRAPPER COMPONENT ---
// This acts as a locked door. It only shows the 'children' (the dashboard) if the correct PIN is entered.
const RequirePin = ({ children, correctPin, roleName }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsAuthenticated(true);
    } else {
      setError('❌ Incorrect PIN. Access Denied.');
      setPin('');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '350px', width: '100%' }}>
        
        {/* Lock Icon and Header */}
        <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', letterSpacing: '1px' }}>🔒 {roleName} PORTAL</h2>
        </div>
        
        {error && <p style={{ color: '#dc2626', fontSize: '14px', marginBottom: '15px', fontWeight: 'bold' }}>{error}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="password" 
            placeholder="Enter PIN" 
            value={pin} 
            onChange={(e) => { setPin(e.target.value); setError(''); }}
            style={{ padding: '15px', borderRadius: '8px', border: '2px solid #d1d5db', fontSize: '20px', textAlign: 'center', letterSpacing: '5px', outline: 'none' }}
            autoFocus
          />
          <button type="submit" style={{ padding: '14px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background-color 0.2s' }}>
            Unlock Dashboard
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#9ca3af' }}>AZURA Smart Outpass System</p>
      </div>
    </div>
  );
};

// --- MAIN APP ROUTING ---
const App = () => {
  return (
    <BrowserRouter>
      {/* Notice: The open navigation bar has been completely removed! */}
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <Routes>
          
          {/* PUBLIC ROUTE: Student Portal (No PIN required) */}
          <Route path="/" element={
            <div style={{ padding: '20px' }}>
              <StudentPortal />
            </div>
          } />
          
          {/* PROTECTED ROUTE: HOD Dashboard */}
          <Route path="/hod" element={
            <RequirePin correctPin="1234" roleName="HOD">
              <div style={{ padding: '20px' }}>
                <HodPanel />
              </div>
            </RequirePin>
          } />

          {/* PROTECTED ROUTE: Guard Verification */}
          <Route path="/guard" element={
            <RequirePin correctPin="5678" roleName="SECURITY">
              <div style={{ padding: '20px' }}>
                <GuardVerification />
              </div>
            </RequirePin>
          } />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;