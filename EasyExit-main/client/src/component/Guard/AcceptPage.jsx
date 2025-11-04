import React, { useState, useEffect } from 'react';
import '../Student/Status.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';

const AcceptPage = () => {
    const pass = JSON.parse(localStorage.getItem("pass"));
    const navigate = useNavigate();

      const acceptPass = async () => {
        try {
          const headers = {
            'Authorization': localStorage.getItem("token"),
            'Content-Type': 'application/json',
          };
          const body = {
            id:pass._id
          }
          const data = await axios.patch('https://easyexit-backend.onrender.com/guard/accept',body,{headers});
          console.log(data)
          navigate("/guard/verified");
        } catch (error) {
          console.error('Error fetching accepted passes:', error);
        }
      };
  return (
    <>
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="submit-container">
          <div className="submit" onClick={() => navigate('/guard')}>Verification Page</div>
          <div className="submit gray" onClick={() => navigate('/guard/verified')}>Verified</div>
        </div>
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
          <span className="label">Current Semester</span>
          <span className="value">{pass.sem}</span>
        </div>
        <div className="detail">
          <span className="label">Transport</span>
          <span className="value">{pass.transport}</span>
        </div>
        <div className="detail">
          <span className="label">Purpose</span>
          <span className="value">{pass.purpose}</span>
        </div>
        <div className="detail">
          <span className="label">Time</span>
          <span className="value">{pass.outtime}</span>
        </div>
        <div className="detail">
          <span className="label">Date</span>
          <span className="value">{pass.date}</span>
        </div>
        <div className="detail">
          <span className="label">Own Responsibility</span>
          <span className="value">{pass.ownResponsibility?"Yes":"No"}</span>
        </div>
        <div className="detail" style={{display:"flex", justifyContent:"center"}}>
          <span className="label" style={{textAlign:"center"}}>{pass.isAccepted?<><span className="status-icon">&#10004; </span>Accepted by Admin</>:<><span className="status-icon">&#10060;</span> Rejected by Admin</>}</span>
        </div>
      </div>
      <button className="status-button status-accepted" onClick={(e)=>acceptPass(e)}>Verify</button>
    </div>
      </div>
    </div>
    
    </>
  );
};

export default AcceptPage;
