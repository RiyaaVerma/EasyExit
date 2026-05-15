import React, { useState, useEffect } from 'react';
import '../Student/Status.css';
import axios from "axios";

const Accepted = () => {
 const [acceptedPasses, setAcceptedPasses] = useState([]);

  useEffect(() => {
    const fetchAcceptedPasses = async () => {
      try {
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        };
        const data = await axios.get("https://easyexitbackend.onrender.com/admin/accepted",{headers});
        setAcceptedPasses(data.data.data);
        console.log(data.data.data)
      } catch (error) {
        console.error("ERROR:", error.response?.data);
      }
    };

    fetchAcceptedPasses();
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
      {acceptedPasses && acceptedPasses.length > 0 ? (
        <table>
          <thead>
            <tr className='even-row'>
              <th>Name</th>
              <th>Enrollment no.</th>
              <th>To Where</th>
              <th>Date</th>
              <th>Out-time</th>
              <th>Avail Status</th>
            </tr>
          </thead>
          <tbody>
            {acceptedPasses.map((pass, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{pass.name}</td>
                <td>{pass.roll}</td>
                <td>{pass.where}</td>
                <td>{pass.date}</td>
                <td>{pass.outtime}</td>
                <td style={{ fontWeight: 'bold', color: 'blue' }}>{pass.otp}</td>
                <td>{pass.isUsed ? "Availed" : "Not Availed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-pending-passes">No Approved passes</div>
      )}
    </div>
  );
};

export default Accepted;
