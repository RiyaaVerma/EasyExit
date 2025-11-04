import React, { useState } from 'react';
import './RequestPass.css';
import axios from "axios";

const RequestPass = () => {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    where: '',
    sem: '',
    transport: '',
    purpose: '',
    outtime: '',
    date: '',
    ownResponsibility: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(localStorage.getItem("token"));
      const headers = {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json',
      };
      // console.log(JSON.stringify(formData))
      const response = await axios.post('https://easyexit-backend.onrender.com/student', formData, {headers});
      alert("Request Sent Successfully!!")
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="request-pass">
      <h2>Request for Pass</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-row" style={{width:"100%"}}>
          <div className="input-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          </div>
          <div className="input-row" style={{width:"100%"}}>
            <div className="input-group">
              <label>Enrollment No.:</label> 
              <input type="text" name="roll" value={formData.roll} onChange={handleChange} />
            </div>
          </div>

          <div className="input-row" style={{width:"100%"}}>
          <div className="input-group">
            <label>Proceeding To:</label> 

            <input type="text" name="where" value={formData.where} onChange={handleChange} />
          </div>  
        </div>
        <div className="input-row" style={{width:"100%"}}>
          <div className="input-group" style={{marginRight:"5%"}}>
            <label>Current Semester:</label> 
            <input type="number" name="sem" value={formData.sem} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Transport:</label> 
            <input type="text" name="transport" value={formData.transport} onChange={handleChange} />
          </div>
        </div>
        <div className="input-row" style={{width:"100%"}}>
          
          <div className="input-group">
            <label>Purpose:</label> 
            <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} />
          </div>
        </div>
        <div className="input-row" style={{width:"100%"}}>
          <div className="input-group" style={{marginRight:"5%"}}>
            <label>Time:</label> 
            <input type="text" name="outtime" value={formData.outtime} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Date:</label> 
            <input type="text" name="date" value={formData.date} onChange={handleChange} />
          </div>
        </div>
        <div className="input-row" style={{width:"100%"}}>
          <div className="input-group">
            <label>At Own Responsibility:</label> 
            <div className="role-selection">
              <div style={{marginRight:"10px", border:"1px solid grey"}} className={formData.ownResponsibility ? 'role selected' : 'role'} onClick={() => setFormData({ ...formData, ownResponsibility: true })}>Yes</div>
              <div style={{marginLeft:"10px", border:"1px solid grey"}} className={formData.ownResponsibility ? 'role' : 'role selected'} onClick={() => setFormData({ ...formData, ownResponsibility: false })}>No</div>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RequestPass;