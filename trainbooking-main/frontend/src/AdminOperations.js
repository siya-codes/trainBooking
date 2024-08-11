import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './AdminOperations.css'
import toast, { Toaster } from 'react-hot-toast';
import { BASE_URL } from "./api";

function AdminOps() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  
  function Gettime(dateString) {
    const dateObject = new Date(dateString);
    const date = new Date(dateString);

    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    let hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedDate} ${hours}:${formattedMinutes} ${ampm}`;
  }
  useEffect(() => {
    // debugger;
    axios
      .get(BASE_URL+'/getalltrains')
      .then((result) => setData(result?.data?.data));
    // console.log(data);
    // debugger;
  }, [data]);

  const del=(dl)=>{
    axios.delete(BASE_URL+'/deletetrain?_id='+dl).then(function(response){
      // console.log(response)
      if(response?.data?.success){
        toast.success(response?.data?.message)
      }
      else{
        toast.error(response?.data?.message)

      }
    }).catch(function(error){
      console.log(error)
    })

  }
  return (
    <>
    <Toaster />
    <div className="admin-ops">

    
      <div >
        <h1 className="text-black font-bold text-2xl">ADMIN DASHBOARD</h1>
        <br />
        {/* <button onClick={() => navigate("/UpdateTrain")}>Update Train</button>
        <br />
        <button onClick={() => navigate("/DeleteTrain")}>Delete Train</button> */}
        <br />
      </div>
      <div>
        <div>
          <table class="content-table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Train Number</th>
                <th scope="col">Train Name</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Available Seats</th>
                <th scope="col">Ticket Cost</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item._id}>
                    <td><b>{item.TrainNo}</b></td>
                    <td><b>{item.TrainName}</b></td>
                    <td>{item.Origin}</td>
                    <td>{item.Destination}</td>
                    <td>{Gettime(item.ArrivalTime)}</td>
                    <td>{Gettime(item.DepartureTime)}</td>
                    <td>{item.Fare}</td>
                    <td>{item.SeatAvailability<=0 ? 'Sold Out' : item.SeatAvailability}</td>
                    <div className="flex gap-2">
                    <Link to={`/UpdateTrain?_id=${item?._id}`}>
                    <p className="px-2 py-1 bg-black text-white rounded mt-2" >Update</p>
                    </Link>
                    <p className="cursor-pointer px-2 py-1 bg-black text-white rounded mt-2" onClick={() => del(item._id)}>Delete</p>
                    </div>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="admin-ops-insert">
          <button onClick={() => navigate("/InsertTrain")}>Insert Train</button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default AdminOps;

// onPress={() => {}}
