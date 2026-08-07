import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HodPanel = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // This function reaches out to our new backend route
  const fetchPending = async () => {
    try {
      setLoading(true);
      // FIXED: Swapped localhost for the live Render URL
      const response = await axios.get('https://outpass-backend-7ssu.onrender.com/api/outpass/pending');
      if (response.data.success) {
        setPendingRequests(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("❌ Failed to load pending requests.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect runs the fetch function automatically as soon as the page loads
  useEffect(() => {
    fetchPending();
  }, []);

  // Approves a specific outpass when the button in the table is clicked
  const handleApprove = async (id, studentName) => {
    try {
      const response = await axios.put(`https://outpass-backend-7ssu.onrender.com/api/outpass/approve/${id}`);
      if (response.data.success) {
        setMessage(`✅ Approved outpass for ${studentName}`);
        // Refresh the list so the approved student disappears from the pending table
        fetchPending();
      }
    } catch (error) {
      setMessage(`❌ Error approving ${studentName}'s outpass.`);
    }
    
    // Clear the message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '8px' }}>
      <h2>HOD Approval Dashboard</h2>
      
      {message && (
        <div style={{ marginBottom: '15px', padding: '10px', borderRadius: '4px', backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da', color: message.includes('✅') ? '#155724' : '#721c24' }}>
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading requests...</p>
      ) : pendingRequests.length === 0 ? (
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', textAlign: 'center', color: '#666' }}>
          <p>No pending outpass requests at this time.</p>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#007BFF', color: 'white', textAlign: 'left' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Roll No</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Destination</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Reason</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((req) => (
              <tr key={req.id} style={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>{req.name}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{req.rollNo}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{req.destination}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{req.reason}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleApprove(req.id, req.name)}
                    style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HodPanel;