// import React, {useEffect, useState} from 'react';
// import './Status.css';
// import axios from "axios";

// const Status = () => {
//   const [pass, setPass] = useState({});
//   useEffect(() => {
//     const fetchPastPasses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         // FIX: Add the Bearer prefix
//         const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

//         const headers = {
//           'Authorization': authHeader,
//           'Content-Type': 'application/json',
//         };
//         const data = await axios.get('http://localhost:5000/student/status',{headers});
//         // console.log(data.data.data)
//         setPendingPasses(response.data.data);
//       } catch (error) {
//         console.error('Error fetching status:', error.response?.data || error.message);
//       }
//     };

//     fetchPastPasses()
//   }, []); // Empty dependency array to ensure the effect runs only once

//   return (
//       <div className="status-container">
//         <div className="detail1">
//             <span className="label">Name:</span>
//             <span className="value">{pass.name}</span>
//           </div>
//         <div className="status-details">
          
//           <div className="detail">
//             <span className="label">Enrollment No.:</span>
//             <span className="value">{pass.roll}</span>
//           </div>
//           <div className="detail">
//             <span className="label">Proceeding to:</span>
//             <span className="value">{pass.where}</span>
//           </div>
//           <div className="detail">
//             <span className="label">Current Semester</span>
//             <span className="value">{pass.sem}</span>
//           </div>
//           <div className="detail">
//             <span className="label">Transport</span>
//             <span className="value">{pass.transport}</span>
//           </div>
//           <div className="detail">
//             <span className="label">Purpose</span>
//             <span className="value">{pass.purpose}</span>
//           </div>
//           <div className="detail">
//             <span className="label">Time</span>
//             <span className="value">{pass.outtime}</span>
//           </div>
//           <div className="detail">
//             <span className="label">Date</span>
//             <span className="value">{pass.date}</span>
//           </div>
//           <div className="detail">
//             <span className="label">Own Responsibility</span>
//             <span className="value">{pass.ownResponsibility?"true":"false"}</span>
//           </div>
//         </div>
//         {
//           pass.isAccepted === true?
//             <button className="status-button status-accepted"> 
//               Approved
//             </button> 
//           : 
//           (
//             pass.rejectReason ? 
//               <button className="status-button status-rejected"> 
//                 Rejected
//               </button> 
//             :
//               <button className="status-button status-pending">
//                 Pending
//               </button>
//           )
//         }
//       </div>
//   );
// };

// export default Status;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Status = () => {
  const [pass, setPass] = useState({});

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

        const headers = {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        };

        // We renamed 'data' to 'response' to avoid confusion with the inner '.data'
        const response = await axios.get('http://localhost:5000/student/status', { headers });
        
        // FIX: Use setPass (which you defined at the top) and access the correct data path
        if (response.data.data) {
           // If the backend returns an array, take the first item, else just take the object
           const passData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
           setPass(passData || {});
        }

      } catch (error) {
        console.error('Error fetching status:', error.response?.data || error.message);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="status-container">
      <div className="detail1">
        <span className="label">Name:</span>
        <span className="value">{pass.name}</span>
      </div>
      <div className="status-details">
        <div className="detail">
          <span className="label">Enrollment No.:</span>
          <span className="value">{pass.roll}</span>
        </div>
        <div className="detail">
          <span className="label">Proceeding to:</span>
          <span className="value">{pass.where}</span>
        </div>
        <div className="detail">
          <span className="label">Time</span>
          <span className="value">{pass.outtime}</span>
        </div>
        <div className="detail">
          <span className="label">Date</span>
          <span className="value">{pass.date}</span>
        </div>
      </div>

      {/* --- OTP DISPLAY SECTION --- */}
      {pass.isAccepted && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: '#e6fffa', 
          border: '2px dashed #38b2ac',
          textAlign: 'center',
          borderRadius: '8px'
        }}>
          <h2 style={{ color: '#2c7a7b', margin: '0' }}>GATE PASS OTP</h2>
          <div style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '8px', color: '#234e52' }}>
            {pass.otp || "000000"}
          </div>
          <p style={{ fontSize: '12px', color: '#4a5568' }}>Show this to the guard at the gate</p>
        </div>
      )}
      {/* --------------------------- */}

      <div style={{ marginTop: '20px' }}>
        {pass.isAccepted ? (
          <button className="status-button status-accepted">Approved</button>
        ) : pass.rejectReason ? (
          <div>
            <button className="status-button status-rejected">Rejected</button>
            <p style={{ color: 'red', fontSize: '12px' }}>Reason: {pass.rejectReason}</p>
          </div>
        ) : (
          <button className="status-button status-pending">Pending</button>
        )}
      </div>
    </div>
  );
};

export default Status;