// Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
// import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const decodedToken = jwtDecode(token);
      const data = {
        name: decodedToken.payload.name,
        email: decodedToken.payload.email,
        role: decodedToken.payload.role,
      }
      setUser(data);
      // if (decodedToken.payload.role != "Admin")
      //   navigate("/" + decodedToken.payload.role);
    }
  }, []);
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const headers = {
  //         'Authorization': localStorage.getItem("token"),
  //         'Content-Type': 'application/json',
  //       };
  //       const data = await axios.get('http://localhost:5000/student/profile',{headers});
  //       // console.log(data.data.data)
  //       setUser(data.data.data);
  //     } catch (error) {
  //       console.error('Error fetching accepted passes:', error);
  //     }
  //   };

  //   fetchProfile()
  // }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      <ul className="nav-links">
        <li><a href={user.role}>Easy<span style={{ color: '#8968FF' }}>Exit</span></a></li>
        <li className="profile-icon" style={{ color: '#8968FF', fontSize: '35px', marginLeft: '87%' }}>
          <i className='bx bx-user'></i>
        </li>
      </ul>

      <div className="profile-card">
        <div className="image">
          <img src="image.jpg" alt="" style={{ width: "inherit" }} />   
        </div>

        <div className="text-data">
          <span className="name"><span class="name-text">Name:</span>{user.name}</span>
          <span className="email"><span class="name-text">Email id:</span>{user.email}</span>
          <span className="prof"><span class="name-text">Logged in as:</span>{user.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
