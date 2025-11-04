import React, { useState, useEffect } from 'react';
import '../Student/Status.css';
import axios from "axios";

const Rejected = () => {
  const [pendingPasses, setPendingPasses] = useState([]);

  useEffect(() => {
    // Fetch the list of students with pending outpasses from the backend API
    const fetchPendingPasses = async () => {
      try {
        const headers = {
          'Authorization': localStorage.getItem("token"),
          'Content-Type': 'application/json',
        };
        const data = await axios.get('https://easyexit-backend.onrender.com/admin/rejected',{headers});
        setPendingPasses(data.data.data);
      } catch (error) {
        console.error('Error fetching accepted passes:', error);
      }
    };

    fetchPendingPasses();
  }, []);

  // Settings for the react-slick carousel/slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="pending-passes-slider">
      {pendingPasses && pendingPasses.length > 0 ? (
        <table>
          <thead>
          <tr className='even-row'>
              <th>Name</th>
              <th>Enrollment no.</th>
              <th>To Where</th>
              <th>Date</th>
              <th>Out-time</th>
              <th>Reject Reason</th>
            </tr>
          </thead>
          <tbody>
          
            {pendingPasses.map((pass, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{pass.name}</td>
                <td>{pass.roll}</td>
                <td>{pass.where}</td>
                <td>{pass.date}</td>
                <td>{pass.outtime}</td>
                <td>{pass.rejectReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-pending-passes">No rejected passes</div>
      )}
    </div>
  );
};

export default Rejected;
