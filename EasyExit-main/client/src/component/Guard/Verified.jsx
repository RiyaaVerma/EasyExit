import React, { useState, useEffect } from 'react';
import '../Student/PastPasses.css';
import axios from 'axios';

const Verified = () => {
  const [pastPasses, setPastPasses] = useState([]);

  useEffect(() => {
    // Fetch the list of students with pending outpasses from the backend API
    const fetchPastPasses = async () => {
      try {
        const headers = {
          'Authorization': localStorage.getItem("token"),
          'Content-Type': 'application/json',
        };
        const data = await axios.get('https://easyexit-backend.onrender.com/guard/verified',{headers});
        console.log(data)
        setPastPasses(data.data.data);
      } catch (error) {
        console.error('Error fetching accepted passes:', error);
      }
    };

    fetchPastPasses();
  }, []);
  return (
    <div className="past-passes">
     {pastPasses?
      (<table>
      <thead>
          <tr className='even-row'>
              <th>Name</th>
              <th>Enrollment no.</th>
              <th>To Where</th>
              <th>Date</th>
              <th>Out-time</th>
              
            </tr>
          </thead>
        <tbody>
        
       
          {pastPasses.map((pass, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{pass.name}</td>
              <td>{pass.roll}</td>
              <td>{pass.where}</td>
              <td>{pass.date}</td>
              <td>{pass.outtime}</td>
              
            </tr>
          ))}
        </tbody>
      </table>)
     :
    ( <div>No verified passes</div>)
     }
    </div>
  );
};

export default Verified;
