import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./api";
import toast, { Toaster } from "react-hot-toast";
//import './Login.css';

function UserLogin(props) {
  const handleSubmit = async(e) => {
      const data=await fetch(BASE_URL+'/login',{
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
          toast.error(response.message)
          // alert("No Account with that Email and password..");
        } else {
          toast.success(response.message)
          localStorage.setItem("token", response?.token);
          // alert("Account Found");
          navigate("/UserOperations");
          // UserOperations
        }
   

    // e.preventDefault();
  };
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Notfound, setNotfound] = useState(false);
  return (
    <>
    <Toaster/>
    <div className="Login">
      <div className="Userform"
       onSubmit={(e)=>e.preventDefault()}
      >
        <h1>USER LOGIN</h1>
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
    </>
  );
}
export default UserLogin;
