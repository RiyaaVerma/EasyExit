import React, { useState, useEffect } from 'react';
import './PastPasses.css';
import axios from "axios";

const PastPasses = () => {
  const [pastPasses, setPastPasses] = useState([]);

  useEffect(() => {
    const fetchPastPasses = async () => {
      try {
        const headers = {
          'Authorization': localStorage.getItem("token"),
          'Content-Type': 'application/json',
        };
        const data = await axios.get('https://easyexit-backend.onrender.com/student/history',{headers});
        setPastPasses(data.data.data);
      } catch (error) {
        console.error('Error fetching accepted passes:', error);
      }
    };

    fetchPastPasses();
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div className="past-passes">
      {/* <h2>Past Passes</h2> */}
      <table>
        <thead>
          <tr className='even-row'>
            <th>Where</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        
        
          {pastPasses.map((pass, index) => (
            
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{pass.where}</td>
              <td>{pass.date}</td>
              <td>{pass.outtime}</td>
              <td>
                {pass.isAccepted? (
                  <><span className="status-icon">&#10004;</span> Accepted</>
                ) : pass.rejectReason ? (
                  <><span className="status-icon">&#10060;</span> Rejected <br /> {pass.rejectReason}</>
                ) : (
                  <span>&#x231b; Pending</span>
                )}
              </td>
              
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
};

export default PastPasses;
