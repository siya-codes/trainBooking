import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./api";

function InsertTrain() {
  let navigate = useNavigate();
  const [TrainNo, setTrainNo] = useState('');
  const [TrainName, setTrainName] = useState('');
  const [Origin, setOrigin] = useState('');
  const [Destination, setDestination] = useState('');
  const [DepartureTime, setDepartureTime] = useState('');
  const [ArrivalTime, setArrivalTime] = useState('');
  const [Fare, setFare] = useState('');
  const [SeatAvailability, setSeatAvailability] = useState('');

  async function Submit(e) {
    // try {
      const out = {
        "TrainNo": TrainNo,
        "TrainName": TrainName,
        "Origin": Origin,
        "Destination": Destination,
        "DepartureTime": DepartureTime,
        "ArrivalTime": ArrivalTime,
        "Fare": Fare,
        "SeatAvailability": SeatAvailability
      };
      console.log(out);
      axios.post(BASE_URL+'/addtrain', out)
        .then(function (response) {
          // console.log(response.data);
          // alert(response.data);
          navigate('/AdminOperations')
        })
        
        .catch(function (error) {
          console.log(error);
        });
        e.preventDefault();
    // } catch (error) {
    //   if (error) {
    //     console.log(error)
    //     alert(error)
    //   }
    // }
  }
 return (
    <>
      <div className='insert'>
        <div>

        </div>
        <div className="midcontainer">
          <form className='Userform'>
            <h3>ADDITION OF TRAIN DETAILS</h3>
            <label id="fn">Train Number</label>
            <input required type="number" onChange={event => setTrainNo(event.target.value)}></input>
            <label>Train Name</label>
            <input required type="text" onChange={event => setTrainName(event.target.value)}></input>
            <label>Origin</label>
            <input required type="text" onChange={event => setOrigin(event.target.value)}></input>
            <label>Destination</label>
            <input required type="text" onChange={event => setDestination(event.target.value)}></input>
            <label>Departure Time</label>
            <input required  className="p-4" type="datetime-local" onChange={event => setDepartureTime(event.target.value)}></input>
            <label>Arrival Time</label>
            {/* <DatePicker showTimeSelect showTimeSelectOnly dateFormat="HH:mm" timeIntervals={30} onChange={ e => handleDateChange(e) } /> */}
            <input required className="p-4" type="datetime-local" min={(DepartureTime)} disabled={(DepartureTime.length) ? false : true} onChange={event => setArrivalTime(event.target.value)}></input>
            <label>Fare</label>
            <input required type="number" onChange={event => setFare(event.target.value)}></input>
            <label>SeatAvailability</label>
            <input required type="number" onChange={event => setSeatAvailability(event.target.value)}></input>
            <br/>
            <button disabled={((TrainNo.length) && (TrainName.length) && (Origin.length)
              && (Destination.length) && (DepartureTime.length) && (ArrivalTime.length)
              && (Fare.length) && (SeatAvailability.length)) ? false : true} onClick={(e) => Submit(e)}>Add Train</button>
            <br /><br />
          </form><br /><br />

        </div>
      </div>
    </>
    
  );
}

export default InsertTrain;
