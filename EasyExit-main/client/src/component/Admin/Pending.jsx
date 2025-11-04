import React, { useState, useEffect } from 'react';
import '../Student/Status.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.css";
import axios from "axios";

const PendingPassesSlider = () => {
  const [pendingPasses, setPendingPasses] = useState([]);
  const [reason, setReason] = useState("");
  const [inp, setInp] = useState(false);
  useEffect(() => {
    const fetchPendingPasses = async () => {
      try {
        const headers = {
          'Authorization': localStorage.getItem("token"),
          'Content-Type': 'application/json',
        };
        const data = await axios.get('https://easyexit-backend.onrender.com/admin',{headers});
        setPendingPasses(data.data.data);
        // console.log(data.data.data)
      } catch (error) {
        console.error('Error fetching accepted passes:', error);
      }
    };

    fetchPendingPasses();
  }, []);

  function handleApprove(id) {
    const approve = async () => {
      try {
        const headers = {
          'Authorization': localStorage.getItem("token"),
          'Content-Type': 'application/json',
        };
        const body = {
          status : true,
          id : id
        }
        const data = await axios.post('https://easyexit-backend.onrender.com/admin',body,{headers});
        console.log(data)
        
    window.location.reload();
      } catch (error) {
        console.error('Error fetching accepted passes:', error);
      }
      
    };

    approve();
  }
  function handleReject(e) {
    e.preventDefault();
    setInp(true);
  }
  function finalReject(id) {
    const reject = async () => {
      try {
        const headers = {
          'Authorization': localStorage.getItem("token"),
          'Content-Type': 'application/json',
        };
        const body = {
          status : false,
          id : id,
          reason : reason
        };
        const data = await axios.post('https://easyexit-backend.onrender.com/admin',body,{headers});
        
    window.location.reload();
      } catch (error) {
        console.error('Error rejecting pass:', error);
      }
    };
    reject();
  }

  // Settings for the react-multi-carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 1,
    },
  };

  return (
    <div className="pending-passes-slider" style={{ marginTop: "5%"}}>
      {pendingPasses && pendingPasses.length > 0 ? (
       
        <Carousel
          responsive={responsive}
          autoPlay={false}
          swipeable={true}
          showDots={false}
          draggable={true}
          infinite={true}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          {pendingPasses.map((student) => (
            <div key={student.roll}>
              <div className="status-container">
                <div className="detail1">
                  <span className="label">Name:</span>
                  <span className="value">{student.name}</span>
                </div>
                <div className="status-details">
                  <div className="detail">
                    <span className="label">Enrollment No.:</span>
                    <span className="value">{student.roll}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Proceeding to:</span>
                    <span className="value">{student.where}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Current Semester:</span>
                    <span className="value">{student.sem}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Transport:</span>
                    <span className="value">{student.transport}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Purpose:</span>
                    <span className="value">{student.purpose}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Time:</span>
                    <span className="value">{student.outtime}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Date:</span>
                    <span className="value">{student.date}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Own Responsibility:</span>
                    <span className="value">{student.ownResponsibility ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className='buttons' style={{ marginBottom: "3%" , display: inp?"none":"block"}}>
                  <button className="status-button status-accepted" onClick={()=>{handleApprove(student._id)}} style={{ marginRight: "5%", marginLeft: "5%" }}>Approve</button>
                  <button className="status-button status-rejected" onClick={(e)=>{handleReject(e)}} style={{ marginLeft: "5%", marginRight: "5%" }}>Reject</button>
                </div>
                <div className='inpbtn' style={{ marginTop: "5%", display: inp?"block":"none" }}>
                  <div className="input-row" style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}>
                    <div className="input-group">
                      <input type="text" name="reason" id="reason" placeholder='Reason' style={{ border: "1px solid grey" }} value={reason} onChange={(e) => { setReason(e.target.value) }} />
                    </div>
                  </div>

                  <button className="status-button status-rejected" onClick={()=>finalReject(student._id)} style={{ marginLeft: "5%", marginRight: "5%", marginTop: "0px" }}>Reject</button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="no-pending-passes">No pending passes</div>
      )}
    </div>
  );
};

export default PendingPassesSlider;
