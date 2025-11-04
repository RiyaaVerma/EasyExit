// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from '../Navbar';
import Pending from './Pending';
import Accepted from './Accepted';
import Rejected from './Rejected';
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
const Appa = (props) => {
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
      if (decodedToken.payload.role != "Admin")
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
          <div className={activeTab === 'Pending' ? 'submit' : 'submit gray'} onClick={() => handleTabChange('Pending')}>Pending Passes</div>
          <div className={activeTab === 'Accepted' ? 'submit' : 'submit gray'} onClick={() => handleTabChange('Accepted')}>Approved</div>
          <div className={activeTab === 'Rejected' ? 'submit' : 'submit gray'} onClick={() => handleTabChange('Rejected')}>Rejected</div>
        </div>
        {activeTab === 'Pending' && <Pending />}
        {activeTab === 'Accepted' && <Accepted />}
        {activeTab === 'Rejected' && <Rejected />}
      </div>
    </div>
  );
};

export default Appa;
