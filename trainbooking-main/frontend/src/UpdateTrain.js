import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./UpdateTrain.css";
import { BASE_URL } from "./api";
//import "./Login.css";

export default function Updatetrain() {
  const [Out, setOut] = useState([]);
  const [TrainNo, setTrainNo] = useState("");
  const [TrainName, setTrainName] = useState("");

  const [Origin, setOrigin] = useState("");

  const [Destination, setDestination] = useState("");

  const [DepartureTime, setDepartureTime] = useState("");

  const [ArrivalTime, setArrivalTime] = useState("");

  const [Fare, setFare] = useState("");

  const [SeatAvailability, setSeatAvailability] = useState("");

  const navigate = new useNavigate();
  const [search,setsearch]=useSearchParams()

  useEffect(() => {
    axios
      .get(
    BASE_URL+'/gettrainbyid?_id='+search.get('_id')
      )

      .then(function (response) {
        // console.log(response);
        setOut(response.data.data[0]);

        setTrainNo(response.data.data[0].TrainNo);
        setTrainName(response.data.data[0].TrainName);

        setOrigin(response.data.data[0].Origin);

        setDestination(response.data.data[0].Destination);

        setDepartureTime(formatDateTime(response.data.data[0].DepartureTime));

        setArrivalTime(formatDateTime(response.data.data[0].ArrivalTime));

        setFare(response.data.data[0].Fare);

        setSeatAvailability(response.data.data[0].SeatAvailability);

        console.log(response.data);
      });
  }, []);

  function handleSubmit(e) {
    const Data = {
      _id:search.get('_id'),
      TrainNo: TrainNo,
      TrainName: TrainName,
      Origin: Origin,

      Destination: Destination,

      DepartureTime: DepartureTime,

      ArrivalTime: ArrivalTime,

      Fare: Fare,

      SeatAvailability: SeatAvailability,
    };

    // console.log(Data);

    axios
      .put(
        BASE_URL+'/updatetrain',
        Data
      )

      .then(function (response) {
        console.log(response.data);

        alert("Updated Successfully..");

        navigate("/AdminOperations");
      })
      .catch(function (error) {
        console.log(error);
      });

    e.preventDefault();
  }
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  return (
    <div className="insert">
      {/*            {" "} */}
      <form className="Userform">
        <h1>UPDATE TRAIN</h1>
       <br />
        <label id="fn">Train Number</label>
       {/* disabled value={Out.TrainNumber} */}
        {/* onChange={event => setTrainNumber(event.target.value)} */}
        {/*      {" "} */}
        <input
          required
          type="number"
          readOnly
          value={localStorage.getItem("TrainNo")}
        ></input>
         
         <label>TrainName</label>
         <input
          required
          type="text"
          defaultValue={Out.TrainName}
          onChange={(event) => setTrainName(event.target.value)}
         
        ></input>

        <label>Origin</label>
        <input
          required
          type="text"
          defaultValue={Out.Origin}
          onChange={(event) => setOrigin(event.target.value)}
        ></input>
         <label>Destination</label>
        <input
          required
          type="text"
          defaultValue={Out.Destination}
          onChange={(event) => setDestination(event.target.value)}
        ></input>
         <label>Departure Time</label>
        <input
          required
          type="datetime-local"
            className="p-3"
          defaultValue={Out.DepartureTime}
          value={DepartureTime}
          onChange={(event) => setDepartureTime(event.target.value)}
        ></input>
       <label>Arrival Time</label>
        <input
          required
          type="datetime-local" 
          className="p-3"
          min={DepartureTime}
          disabled={DepartureTime.length ? false : true}
          defaultValue={Out.ArrivalTime}
          value={ArrivalTime}
          onChange={(event) => setArrivalTime(event.target.value)}
        ></input>
         <label>Available Seats</label>
        <input
          required
          type="number"
          defaultValue={Out.Fare}
          onChange={(event) => setFare(event.target.value)}
        ></input>
     <label>Ticket Cost</label>
        <input
          required
          type="number"
          defaultValue={Out.SeatAvailability}
          onChange={(event) => setSeatAvailability(event.target.value)}
        ></input>
         <button onClick={(e) => handleSubmit(e)}>Update</button>
     
      </form>
      <br />
      <br />
    </div>
  );
}
