// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from '../Navbar';
import RequestPass from './RequestPass';
import PastPasses from './PastPasses';
import Status from './Status';
import { jwtDecode } from 'jwt-decode'

import { useNavigate } from 'react-router-dom';
const App = () => {
  const [activeTab, setActiveTab] = useState('RequestPass');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/login");
    } else {
      console.log("here")
      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      if (decodedToken.payload.role != "Student"){
        console.log("this");
        navigate("/" + decodedToken.payload.role);
      }
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="header">
          <div className="text">{activeTab}</div>
          <div className="underline"></div>
        </div>
        <div className="submit-container">
          <div className={activeTab === 'RequestPass' ? 'submit' : 'submit gray'} onClick={() => handleTabChange('RequestPass')}>Request for Pass</div>
          <div className={activeTab === 'PastPasses' ? 'submit' : 'submit gray'} onClick={() => handleTabChange('PastPasses')}>Past Passes</div>
          <div className={activeTab === 'Status' ? 'submit' : 'submit gray'} onClick={() => handleTabChange('Status')}>Status</div>
        </div>
        {activeTab === 'RequestPass' && <RequestPass />}
        {activeTab === 'PastPasses' && <PastPasses />}
        {activeTab === 'Status' && <Status />}
      </div>
    </div>
  );
};

export default App;
