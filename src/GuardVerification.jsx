import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const GuardVerification = () => {
  const [scanResult, setScanResult] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [manualId, setManualId] = useState('');

  const verifyOutpass = async (idToVerify) => {
    setIsScanning(false); 
    setScanResult(idToVerify);

    try {
      const response = await axios.put(`https://outpass-backend-7ssu.onrender.com`);
      
      if (response.data.success) {
        setStatusMessage('✅ VALID\n' + response.data.message);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Verification failed';
      setStatusMessage('❌ DENIED\n' + errorMsg);
    }
    
    // Reset scanner and inputs after 4 seconds
    setTimeout(() => {
      setScanResult('');
      setStatusMessage('');
      setManualId('');
      setIsScanning(true);
    }, 4000);
  };

  const handleScan = (result, error) => {
    if (!!result && isScanning) {
      verifyOutpass(result?.text);
    }
  };

  const handleManualSubmit = () => {
    if (manualId.trim() !== '') {
      verifyOutpass(manualId.trim());
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* MAIN SCANNER CARD */}
      <div style={{ width: '100%', maxWidth: '450px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #eaeaea', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        
        {/* DARK THEMED HEADER */}
        <div style={{ backgroundColor: '#111827', padding: '20px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#ffffff', fontSize: '20px', letterSpacing: '1.5px' }}>
            SECURITY CHECKPOINT
          </h2>
        </div>

        <div style={{ padding: '25px' }}>
          {isScanning ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* CAMERA FEED */}
              <div style={{ border: '4px solid #374151', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                <QrReader
                  onResult={handleScan}
                  constraints={{ facingMode: 'environment' }}
                  containerStyle={{ width: '100%' }}
                />
                <div style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(31, 41, 55, 0.9)', padding: '12px 0', textAlign: 'center', color: '#10b981', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px' }}>
                  [ SCANNING ACTIVE ]
                </div>
              </div>

              {/* VISUAL DIVIDER */}
              <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: '#9ca3af', fontSize: '14px', fontWeight: 'bold' }}>
                <div style={{ flex: 1, height: '2px', backgroundColor: '#f3f4f6' }}></div>
                <span style={{ padding: '0 15px' }}>OR</span>
                <div style={{ flex: 1, height: '2px', backgroundColor: '#f3f4f6' }}></div>
              </div>

              {/* MANUAL OVERRIDE */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#4b5563', textTransform: 'uppercase' }}>Manual ID Override</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Enter Outpass ID..."
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none' }}
                  />
                  <button 
                    onClick={handleManualSubmit}
                    style={{ padding: '0 20px', backgroundColor: '#374151', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.2s' }}
                  >
                    Verify
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* RESULT SCREEN (Flashes High-Contrast Green or Red) */
            <div style={{ 
              padding: '50px 20px', 
              textAlign: 'center',
              border: statusMessage.includes('✅') ? '6px solid #10b981' : '6px solid #ef4444',
              borderRadius: '12px',
              backgroundColor: statusMessage.includes('✅') ? '#ecfdf5' : '#fef2f2',
            }}>
              <h2 style={{ 
                color: statusMessage.includes('✅') ? '#047857' : '#b91c1c', 
                margin: 0,
                fontSize: '26px',
                lineHeight: '1.5',
                whiteSpace: 'pre-line' // Allows the \n in our message to create a new line
              }}>
                {statusMessage}
              </h2>
              <p style={{ marginTop: '30px', color: '#6b7280', fontSize: '15px', fontWeight: 'bold' }}>
                Resetting scanner...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuardVerification;