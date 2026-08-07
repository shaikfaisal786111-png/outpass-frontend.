import React, { useState } from 'react';
import './App.css'; // NEW: Importing our CSS file!
import GuardVerification from './GuardVerification'; 
import StudentPortal from './StudentPortal';
import HodPanel from './HodPanel';

function App() {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', margin: 0, padding: 0, fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
      
      {/* TOP NAVIGATION BAR (Now using classes from App.css) */}
      <nav className="navbar">
        <div className="nav-brand">
          <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#1a237e', fontWeight: 'bold' }}>
            AZ
          </div>
          <h1 style={{ margin: 0, fontSize: '22px', letterSpacing: '1px' }}>Smart Outpass</h1>
        </div>

        <div className="nav-links">
          <button 
            className="nav-button"
            onClick={() => setActiveTab('student')}
            style={{ 
              backgroundColor: activeTab === 'student' ? 'rgba(255,255,255,0.2)' : 'transparent',
              fontWeight: activeTab === 'student' ? 'bold' : 'normal'
            }}
          >
            Student Portal
          </button>
          <button 
            className="nav-button"
            onClick={() => setActiveTab('hod')}
            style={{ 
              backgroundColor: activeTab === 'hod' ? 'rgba(255,255,255,0.2)' : 'transparent',
              fontWeight: activeTab === 'hod' ? 'bold' : 'normal'
            }}
          >
            HOD Dashboard
          </button>
          <button 
            className="nav-button"
            onClick={() => setActiveTab('guard')}
            style={{ 
              backgroundColor: activeTab === 'guard' ? 'rgba(255,255,255,0.2)' : 'transparent',
              fontWeight: activeTab === 'guard' ? 'bold' : 'normal'
            }}
          >
            Guard Check
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          {activeTab === 'student' && <StudentPortal />}
          {activeTab === 'hod' && <HodPanel />}
          {activeTab === 'guard' && <GuardVerification />}
        </div>
      </main>

    </div>
  );
}

export default App;