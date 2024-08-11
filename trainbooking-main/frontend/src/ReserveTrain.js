import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./UpdateTrain.css";
//import "./Login.css";

export default function ReserveTrain() {
  const [Out, setOut] = useState([]);
  const [UserName, setUserName] = useState("");
  const [TrainNo, setTrainNo] = useState("");
  const [PNR, setPNR] = useState("");
  const [Origin, setOrigin] = useState("");
  const [Destination, setDestination] = useState("");
  const [Fare, setFare] = useState("");
  const [ArrivalTime, setArrivalTime] = useState("");
  const [DepartureTime, setDepartureTime] = useState("");
  const [SeatNo, setSeatNo] = useState("");
  const navigate = new useNavigate();
    useEffect(() => {
        axios
          .get(
            `https://localhost:7018/api/Train/${localStorage.getItem(
              "TrainNo"
            )}`
          )

      .then(function (response) {
        setOut(response.data[0]);

        setUserName(response.data[0].UserName);
        setTrainNo(response.data[0].TrainNo);
        setPNR(response.data[0].PNR);
        setOrigin(response.data[0].Origin);
        setDestination(response.data[0].Destination);
        setFare(response.data[0].Fare);
        setArrivalTime(response.data[0].ArrivalTime);
        setDepartureTime(response.data[0].DepartureTime);
        setSeatNo(response.data[0].SeatNo);
        console.log(response.data);
      });
  }, []);

  function handleSubmit(e) {
    const Data = {
      UserName: UserName,
      TrainNo: localStorage.getItem("TrainNo"),
      PNR: PNR,
      Origin: Origin,
      Destination: Destination,
      Fare: Fare,
      ArrivalTime: ArrivalTime,
      DepartureTime: DepartureTime,
      SeatNo: SeatNo,
    };

    console.log(Data);

    axios
    .put(
        `https://localhost:7018/api/AdminLoginPage/Puttrain/${localStorage.getItem(
          "TrainNo"
        )}`,
        Data
      )

      .then(function (response) {
        console.log(response.data);

        alert("Submitted Successfully..");

        navigate("/TicketInfo");
      })
      .catch(function (error) {
        console.log(error);
      });

    e.preventDefault();
  }

  return (
    <div className="Login">
      {/*            {" "} */}
      <form className="Userform">
        <h1>TICKET RESERVATION</h1>
       <br />
        <label id="fn">User Name</label>
       {/* disabled value={Out.TrainNumber} */}
        {/* onChange={event => setTrainNumber(event.target.value)} */}
        {/*      {" "} */}
        <input
          required
          type="text"
          readOnly
          value={localStorage.getItem("TrainNo")}
        ></input>
         
         <label>TrainNo</label>
         <input
          required
          type="number"
          defaultValue={Out.TrainNo}
          onChange={(event) => setTrainNo(event.target.value)}
        ></input>

        <label>PNR</label>
        <input
          required
          type="number"
          defaultValue={Out.PNR}
          onChange={(event) => setPNR(event.target.value)}
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
         
         <label>Fare</label>
        <input
          required
          type="number"
          defaultValue={Out.Fare}
          onChange={(event) => setFare(event.target.value)}
        ></input>
          
          <label>Arrival Time</label>
        <input
          required
          type="datetime-local"
          min={DepartureTime}
          disabled={DepartureTime.length ? false : true}
          defaultValue={Out.ArrivalTime}
          onChange={(event) => setArrivalTime(event.target.value)}
        ></input>

         <label>Departure Time</label>
        <input
          required
          type="datetime-local"
          defaultValue={Out.DepartureTime}
          onChange={(event) => setDepartureTime(event.target.value)}
        ></input>
      
         <label>SeatNo</label>
        <input
          required
          type="number"
          defaultValue={Out.SeatNo}
          onChange={(event) => setSeatNo(event.target.value)}
        ></input>
         <button onClick={(e) => handleSubmit(e)}>Submit</button>
     
      </form>
      <br />
      <br />
    </div>
  );
}
