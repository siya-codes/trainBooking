import { React, useState, useEffect } from "react";
import axios from "axios";
import './App.css'; // Update your CSS file as needed
import { BASE_URL } from "./api"; // Ensure this points to your API base URL
import {jwtDecode} from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function UserOps() {
  const [data, setData] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
let navigate=useNavigate()
  function fetchdata() {
    if(localStorage.getItem('token') || localStorage.getItem('admintoken') ){
      axios
      .get(BASE_URL + '/getalltrains', {
        params: {
          origin,
          destination,
          departureTime,
        },
      })
      .then((result) => setData(result?.data?.data))
      .catch((error) => {
        console.error('Error fetching train data:', error);
        toast.error('Failed to fetch train data');
      });
    }
    else{
      navigate('/')
    }
    
  }

  useEffect(() => {
    fetchdata();
  }, []);

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

  async function Bookticket(trainId) {
    try {
      let token = localStorage.getItem('token');

      if (token) {
        let { userId } = jwtDecode(token);

        const data = await fetch(BASE_URL + '/booktrain?userId=' + userId + '&trainId=' + trainId, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
          },
        });
        const response = await data.json();
        if (response.success) {
          toast.success(response.message);
          fetchdata();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loadRazorpay = (amount, id) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      const options = {
        key: "rzp_test_jmLsdK6FoWIRSe",
        amount: amount * 100,
        currency: "INR",
        name: "Train booking",
        description: "Product description",
        handler: async function (response) {
          await Bookticket(id);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "8283929792",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
  };
  function clear(){
    setOrigin("")
    setDepartureTime("")
    setDestination("")
    axios
      .get(BASE_URL + '/getalltrains')
      .then((result) => setData(result?.data?.data))
      .catch((error) => {
        console.error('Error fetching train data:', error);
        toast.error('Failed to fetch train data');
      });
  }
function handleLogout(){
  localStorage.removeItem('token')
  navigate('/')
}
  return (
    <>
      <Toaster />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 ">
        <div className="w-full  bg-white shadow-md   pt-6 pb-8 min-h-screen container">
          <h1 className="text-2xl font-bold  text-center">Train Search</h1>
          <div className="flex flex-wrap  items-center my-4">
            <div className="sm:w-1/3 px-2  sm:mb-0">
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Origin"
              />
            </div>
            <div className="sm:w-1/3 px-2  sm:mb-0">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Destination"
              />
            </div>
            <div className="sm:w-1/3 px-2">
              <input
                type="datetime-local"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="sm:w-auto px-2  sm:mt-0">
              <button
                onClick={fetchdata}
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Search
              </button>
            </div>
            <div className="sm:w-auto px-2  sm:mt-0">
              <button
                onClick={clear}
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Clear Filters
              </button>
            </div>
            <div className="sm:w-auto px-2  sm:mt-0">
              <Link
                to='/Ticketinfo'
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                View Tickets
              </Link>
            </div>
            <div className="sm:w-auto px-2  sm:mt-0">
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Log Out
              </button>
            </div>
          </div>
          {data.length === 0 ? (
            <p className="text-center text-gray-700">No trains found.</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th scope="col" className="w-1/6 px-4 py-3">Train No</th>
                  <th scope="col" className="w-1/6 px-4 py-3">Train Name</th>
                  <th scope="col" className="w-1/6 px-4 py-3">Origin</th>
                  <th scope="col" className="w-1/6 px-4 py-3">Destination</th>
                  <th scope="col" className="w-1/6 px-4 py-3">Arrival Time</th>
                  <th scope="col" className="w-1/6 px-4 py-3">Depart Time</th>
                  <th scope="col" className="w-1/6 px-4 py-3">Empty Seats</th>
                  <th scope="col" className="w-1/6 px-4 py-3">Ticket Cost</th>
                  <th scope="col" className="w-1/6 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {data.map((item) => (
                  <tr key={item.TrainNo}>
                    <td className="border px-4 py-2 capitalize">{item.TrainNo}</td>
                    <td className="border px-4 py-2 capitalize">{item.TrainName}</td>
                    <td className="border px-4 py-2 capitalize">{item.Origin}</td>
                    <td className="border px-4 py-2 capitalize">{item.Destination}</td>
                    <td className="border px-4 py-2 capitalize">{Gettime(item.ArrivalTime)}</td>
                    <td className="border px-4 py-2 capitalize">{Gettime(item.DepartureTime)}</td>
                    <td className="border px-4 py-2 capitalize">{item.SeatAvailability<=0 ? 'Sold Out' : item.SeatAvailability}</td>
                    <td className="border px-4 py-2 capitalize">{item.Fare}</td>
                    <td className="border px-2 py-2 ">
                      <button
                      disabled={item.SeatAvailability<=0}
                        className={`bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${item.SeatAvailability<=0 ? 'cursor-not-allowed opacity-50' : ''}`}
                        onClick={() => loadRazorpay(item.Fare, item._id)}
                      >
                        Book Train
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default UserOps;
