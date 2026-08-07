import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

const StudentPortal = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    destination: '',
    reason: ''
  });
  
  const [qrData, setQrData] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setQrData('');

    if (
      !formData.name.trim() || 
      !formData.rollNo.trim() || 
      !formData.destination.trim() || 
      !formData.reason.trim()
    ) {
      setErrorMessage('⚠️ All fields are required. Please complete the form.');
      return;
    }

    try {
      // Updated endpoint URL with route path appended
      const response = await axios.post('https://outpass-backend-7ssu.onrender.com/api/outpass/request', formData);
      
      if (response.data.success) {
        setStatusMessage('✅ Request successfully submitted to HOD!');
        setQrData(response.data.data.id);
        setFormData({ name: '', rollNo: '', destination: '', reason: '' });
      }
    } catch (err) {
      const backendError = err.response?.data?.message || 'Error submitting request. Please try again.';
      setErrorMessage(`❌ ${backendError}`);
    }
  };

  // --- REUSABLE STYLES ---
  const inputStyle = {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    backgroundColor: '#ffffff', /* <-- ADD THIS: Forces a white background */
    color: '#1f2937'            /* <-- ADD THIS: Forces dark text */
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
      
      {/* FORM CARD */}
      <div style={{ width: '100%', maxWidth: '450px', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #eaeaea' }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#1f2937', textAlign: 'center' }}>
          Request Outpass
        </h2>
        
        {errorMessage && (
          <div style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '8px', border: '1px solid #f87171', fontSize: '14px' }}>
            {errorMessage}
          </div>
        )}

        {statusMessage && (
          <div style={{ padding: '12px', marginBottom: '20px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '8px', border: '1px solid #4ade80', fontSize: '14px' }}>
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#4b5563' }}>Full Name</label>
            <input type="text" name="name" placeholder="e.g. John Doe" value={formData.name} onChange={handleChange} style={inputStyle} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#4b5563' }}>Roll Number</label>
            <input type="text" name="rollNo" placeholder="e.g. 101" value={formData.rollNo} onChange={handleChange} style={inputStyle} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#4b5563' }}>Destination</label>
            <input type="text" name="destination" placeholder="Where are you going?" value={formData.destination} onChange={handleChange} style={inputStyle} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#4b5563' }}>Reason</label>
            <textarea name="reason" placeholder="Brief reason for leaving campus..." value={formData.reason} onChange={handleChange} style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} />
          </div>
          
          <button type="submit" style={{ padding: '14px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px', transition: 'background-color 0.2s' }}>
            Submit Request
          </button>
        </form>
      </div>

      {/* DIGITAL TICKET (QR CODE) */}
      {qrData && (
        <div style={{ width: '100%', maxWidth: '350px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #eaeaea', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '15px', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '18px', letterSpacing: '1px' }}>DIGITAL OUTPASS</h3>
          </div>
          <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9fafb' }}>
            <div style={{ padding: '15px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
               <QRCodeSVG value={qrData} size={180} />
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '20px', textAlign: 'center', lineHeight: '1.5' }}>
              Present this code at the security gate.<br/>
              <strong>Valid only after HOD approval.</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;