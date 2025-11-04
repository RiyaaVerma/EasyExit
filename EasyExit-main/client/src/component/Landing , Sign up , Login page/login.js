import React, { useState } from "react";
import './login.css'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import axios from "axios";

const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [repass, setRepass] = useState("");
    const [user, setUser] = useState(null);

    const navigate = useNavigate();


    function handleSubmit() {
        if (action === "Login") {
            handleLogin();
        } else {
            handleSignup();
        }
    }


    async function handleSignup() {
        try {
            if (pass === repass) {
                
            console.log("sendng request")
                const body = {
                    email:email,
                    password:pass,
                    role:role,
                    name:name
                };
                const url = "https://easyexit-backend.onrender.com/signup";
                const response = await axios.post(url, body);
                console.log(response)
                if (response.data.status!="Inserted") {
                    throw new Error('Failed to signup');
                }
                const data = response.data.data;

                localStorage.setItem('token', "Bearer " + data.secret);
                navigate("/" + data.role)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function handleLogin() {
        console.log("start")
        try {
            console.log("sendng request")
            const body = {
                email:email,
                password:pass,
                role:role
            };
            console.log(body)
            const url = "https://easyexit-backend.onrender.com/login";
            console.log(url)
            const response = await axios.post(url, body);
            console.log("fetched")
            console.log(response)
            if (response.data.status!="OK") {
                throw new Error('Failed to login');
            }
            const data = response.data.data;
            
            console.log(data)
            localStorage.setItem('token', "Bearer " + data.secret);

            navigate("/" + data.role)

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                {/* <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div> */}
                <div className="submit-container">
                    <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction('Sign Up') }}>Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction('Login') }}>Login</div>
                </div>
                <div className="inputs">
                    {action === "Login" ? (
                        <>
                            <div className="input">
                                <img src="email.png" alt="" />
                                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email-Id" />
                            </div>
                            <div className="input">
                                <img src="password.png" alt="" />
                                <input type="password" onChange={(e) => { setPass(e.target.value) }} placeholder="Password" />
                            </div>
                            <div className="input2">
                                {/* <img src="password.png" alt="" /> */}
                                <p>Login as : </p>
                                <div className={role === "Admin" ? "submit" : "submit gray"} onClick={() => { setRole('Admin') }}>Admin</div>
                                <div className={role === "Student" ? "submit" : "submit gray"} onClick={() => { setRole('Student') }}>Student</div>
                                <div className={role === "Guard" ? "submit" : "submit gray"} onClick={() => { setRole('Guard') }}>Guard</div>

                            </div>
                        </>
                    ) : (
                        <>
                            <div className="input">
                                <img src="person.png" alt="" />
                                <input type="name" onChange={(e) => { setName(e.target.value) }} placeholder="Name" />
                            </div>
                            <div className="input">
                                <img src="email.png" alt="" />
                                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email-Id" />
                            </div>
                            <div className="input">
                                <img src="password.png" alt="" />
                                <input type="password" onChange={(e) => { setPass(e.target.value) }} placeholder="Password" />
                            </div>
                            <div className="input">
                                <img src="password.png" alt="" />
                                <input type="password" onChange={(e) => { setRepass(e.target.value) }} placeholder="Confirm-Password" />
                            </div>
                            <div className="input2">
                                {/* <img src="password.png" alt="" /> */}
                                <p>Sign Up as : </p>
                                <div className={role === "Admin" ? "submit" : "submit gray"} onClick={() => { setRole('Admin') }}>Admin</div>
                                <div className={role === "Student" ? "submit" : "submit gray"} onClick={() => { setRole('Student') }}>Student</div>
                                <div className={role === "Guard" ? "submit" : "submit gray"} onClick={() => { setRole('Guard') }}>Guard</div>

                            </div>
                        </>
                    )}
                </div>
                <div className="submit-container" style={{ padding: "0", marginTop: "20px", marginBottom: "0px" }}>
                    <div className="submit" onClick={handleSubmit}>Submit</div>
                </div>

            </div>
        </>
    );
};

export default LoginSignup;
