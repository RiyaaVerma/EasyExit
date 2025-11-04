// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from '../Navbar';
import OTPverify from './Otp';
import Verified from './Verified';
import { jwtDecode } from 'jwt-decode'

import { useNavigate } from 'react-router-dom';
const Appg = (props) => {
  const [activeTab, setActiveTab] = useState(props.tab);

  const navigate = useNavigate();
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.payload.role != "Guard")
        navigate("/" + decodedToken.payload.role);
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        {/* <div className="header">
          <div className="text">{activeTab}</div>
          <div className="underline"></div>
        </div> */}
        <div className="submit-container">
          <div className={activeTab === 'OTPverify' ? 'submit' : 'submit gray'} onClick={() => handleTabChange('OTPverify')}>Verification Page</div>
          <div className={activeTab === 'Verified' ? 'submit' : 'submit gray'} onClick={() => handleTabChange('Verified')}>Verified</div>
        </div>
        {activeTab === 'OTPverify' && <OTPverify />}
        {activeTab === 'Verified' && <Verified />}
      </div>
    </div>
  );
};

export default Appg;
