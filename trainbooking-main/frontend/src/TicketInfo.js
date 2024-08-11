import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './AdminOperations.css'
import { BASE_URL } from "./api";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
function Ticketinfo() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  function fetchdata(){
    let token=localStorage.getItem('token')
    if(token){
      // console.log(BASE_URL+'/getbookingbyuserid?userId='+jwtDecode(token).userId);
      axios
      .get(BASE_URL+'/getbookingbyuserid?userId='+jwtDecode(token).userId)
      .then((result) => setData(result?.data?.bookings));
    }
    
  }
  useEffect(() => {
    fetchdata()
  }, []);

  function Gettime(dateString){
    const dateObject = new Date(dateString);
    const date = new Date(dateString);
  
    // Define options for date and time formatting
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    
    // Format the date
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    let hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    const seconds = dateObject.getUTCSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Format minutes and seconds to always show two digits
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedDate} ${hours}:${formattedMinutes} ${ampm}`
  }


  return (
    <>
    <Toaster/>
    <div className="admin-ops">

    
      <div >
        <h1 className="text-xl font-semibold">User Ticket Informations</h1>
        <br />
        {/* <button onClick={() => navigate("/UpdateTrain")}>Update Train</button>
        <br />
        <button onClick={() => navigate("/DeleteTrain")}>Delete Train</button> */}
        <br />
      </div>
      <div>
        <div>
          {
            data.length==0 ? <div className="w-full mx-auto flex justify-center font-extrabold text-4xl">No tickets found</div>
            : <table class="content-table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">User name</th>
                <th scope="col">Train Number</th>
                <th scope="col">Train Name</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Seat no</th>
                <th scope="col">Ticket Cost</th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((item,ind) => {
                return (
                  <tr key={item.TrainNo}>
                    <td><b>{item?.user?.FirstName}</b></td>
                    <td><b>{item.TrainNo}</b></td>
                    <td><b>{item.TrainName}</b></td>
                    <td>{item.Origin}</td>
                    <td>{item.Destination}</td>
                    <td>{Gettime(item.ArrivalTime)}</td>
                    <td>{Gettime(item.DepartureTime)}</td>
                    <td>{item?.seatNumber}</td>
                    <td>{item.Fare}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

            }
        </div>
      </div>
      </div>
    </>
  );
}

export default Ticketinfo;

// onPress={() => {}}
