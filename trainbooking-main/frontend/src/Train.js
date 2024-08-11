import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Train.css";
import { BASE_URL } from "./api";

//import {Table} from "react-bootstrap";

function Train() {
    const [data, setData] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
        navigate('/UserOperations')
      }
      else if(localStorage.getItem('admintoken')){
        navigate('/AdminOperations')
      }
     }, [])

     useEffect(() => {
       axios.get(BASE_URL+'/getalltrains').then((result) =>{
        // console.log(result)
        setData(result?.data?.data)
       }
      
       );
      //  console.log(data);
     }, []);
    
function handleProperdate(isoDateString){
  const date = new Date(isoDateString);

  // Define options for date and time formatting
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
  
  // Format the date
  const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
  const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);
  // console.log('hello');
  // console.log(`Date: ${formattedDate}`);
// console.log(`Time: ${formattedTime}`);
}
     
function Gettime(dateString){
  handleProperdate(dateString)
  const dateObject = new Date(dateString);
  
  let hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();
  const seconds = dateObject.getUTCSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  // Format minutes and seconds to always show two digits
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
return `${hours}:${formattedMinutes} ${ampm}`
}
  return (
    <div className = "container" >
        <div className = "navbar-train"><h1>RAILWAY RESERVATION SYSTEM</h1>
        <p className="nav-link">
          {/* <button  onClick={() => navigate("/AdminLoginPage")}>
            Admin Login
          </button> */}
          <button onClick={() => navigate("/UserRegistration")}>
            SignUp User 
          </button>
          <button onClick={() => navigate("/UserLogin")}>User Login</button>
        </p >
        </div>

        <div className="row" style={{ margin: "10px" }}></div>
        <table className = "content-table">
            <thead >
               <tr>
                 <th scope="col">TrainNo</th>
                 <th scope="col">TrainName</th>
                 <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">ArrivalTime</th>
                <th scope="col">DepartureTime</th>          
               <th scope="col">Fare</th>
                 <th scope="col">SeatAvailability</th>
               </tr>
             </thead>
             <tbody >

                 
             {data?.map((item) => {
                 return(   
                 <tr key={item.TrainNo}>
                    <td>{item.TrainNo}</td>
                    <td>{item.TrainName}</td>
                    <td>{item.Origin}</td>
                    <td>{item.Destination}</td>
                    <td>{Gettime(item.ArrivalTime)}</td>
                    <td>{Gettime(item.DepartureTime)}</td>
                    <td>{item.Fare}</td>
                    <td>{item.SeatAvailability<=0 ? 'Sold Out' : item.SeatAvailability}</td>
                  </tr>
                );
             })}
            </tbody>
          </table>
          </div>
  );
}
export default Train;