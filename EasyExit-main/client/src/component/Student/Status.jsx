import React, {useEffect, useState} from 'react';
import './Status.css';
import axios from "axios";

const Status = () => {
  const [pass, setPass] = useState({});
  useEffect(() => {
    const fetchPastPasses = async () => {
      try {
        const headers = {
          'Authorization': localStorage.getItem("token"),
          'Content-Type': 'application/json',
        };
        const data = await axios.get('https://easyexit-backend.onrender.com/student/status',{headers});
        // console.log(data.data.data)
        setPass(data.data.data[0]);
      } catch (error) {
        console.error('Error fetching accepted passes:', error);
      }
    };

    fetchPastPasses()
  }, []); // Empty dependency array to ensure the effect runs only once

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
            <span className="value">{pass.ownResponsibility?"true":"false"}</span>
          </div>
        </div>
        {
          pass.isAccepted === true?
            <button className="status-button status-accepted"> 
              Approved
            </button> 
          : 
          (
            pass.rejectReason ? 
              <button className="status-button status-rejected"> 
                Rejected
              </button> 
            :
              <button className="status-button status-pending">
                Pending
              </button>
          )
        }
      </div>
  );
};

export default Status;
