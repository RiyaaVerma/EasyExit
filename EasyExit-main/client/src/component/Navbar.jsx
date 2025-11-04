// Navbar.js
import React from 'react';

import { useNavigate } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  function handleLogout(){
    localStorage.clear("token");
    navigate("/login")
  }
  return (
    <div className="navbar" style={{boxShadow:"0 5px 10px rgba(0,0,0,0.2)", zIndex:"2"}}>
      <div className="navbar-left">Easy<span className="exit">Exit</span></div>
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <a href='/profile'><img src="../person.png" alt="" srcset="" style={{marginLeft:"20px"}} /></a>
      </div>
    </div>
  );
};

export default Navbar;
