import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./api";
//import './Login.css';

function AdminLoginPage(props) {
  const handleSubmit = async(e) => {
      const data=await fetch(BASE_URL+'/adminlogin',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
        },
        body:JSON.stringify({Email,Password})
      })
      const response=await data.json()
        //console.log(response.data[0].matches)
        if (!response.success) {
          setNotfound(true);
          // alert("No Account with that Email and password..");
        } else {
          localStorage.setItem("admintoken", response?.token);
          // alert("Account Found");
          navigate("/AdminOperations");
          // UserOperations
        }
   

    // e.preventDefault();
  };
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Notfound, setNotfound] = useState(false);
  return (
    // <>
    <div className="Login">
      <div className="Userform"
       onSubmit={(e)=>e.preventDefault()}
      >
        <h1>ADMIN LOGIN</h1>
        <br />
        <label>Email</label>
        <input
          required
          name="Email"
          type="text"
          onChange={(event) => setEmail(event.target.value)}

        />
        <label>Password</label>
        <input
          required
          name="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br/>
        <button onClick={handleSubmit} className="submitButton" >
        Login
        </button>
        {Notfound ? <p>Invalid Credentials</p> : ""}

        {/* <button onClick={() => navigate(-1)}>Back to Home</button> */}
      </div>
      {/* <>{IsLoggedin && navigate("/AdminOps")}</> */}
    {/* </> */}
    </div>
  );
}
export default AdminLoginPage;
