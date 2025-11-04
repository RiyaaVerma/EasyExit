import React, { useState } from 'react';
import '../Student/RequestPass.css';
import { useNavigate } from 'react-router-dom';
import AcceptPage from './AcceptPage';
import axios from 'axios';

const OTPverify = () => {
  const [roll, setRoll] = useState();
  const [otp, setOTP] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json',
      };
      const body = {
        otp : otp,
        roll : roll,
      };
      const data = await axios.post('https://easyexit-backend.onrender.com/guard',body,{headers});
      
      if(data.status === 401) return(<>Request is Unauthorized</>);
      // if (!response.ok) {
      //   throw new Error('Failed to find outpass');
      // }
      // console.log('Outpass found!!');
      if(!data.data.data){
        alert("Invalid OTP!!");
        window.location.reload();
      }
      else{
        localStorage.setItem("pass", JSON.stringify(data.data.data));
      navigate('/guard/accept');
      }
      // Optionally, you can reset the form fields here
      setOTP();
    } catch (error) {
      console.error('Error in finding outpass:', error);
    }
  };

  return (
   <>
    <div className="request-pass" style={{marginTop:"100px"}}>
      <h2 style={{textAlign:"center"}}>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
      <div className="input-row" style={{width:"100%"}}>
          <div className="input-group">
            <label>Enrollment no:</label>&nbsp;
            <input type="text" name="roll" value={roll} onChange={(e)=>{setRoll(e.target.value)}} />
          </div>
        </div>
        <div className="input-row" style={{width:"100%"}}>
          <div className="input-group">
            <label>Enter OTP:</label>&nbsp;
            <input type="text" name="otp" value={otp} onChange={(e)=>{setOTP(e.target.value)}} />
          </div>
        </div>
       
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
   

  );
};

export default OTPverify;
