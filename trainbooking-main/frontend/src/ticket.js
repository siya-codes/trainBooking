import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { BASE_URL } from './api';

const Ticket = () => {
  const [search,setsearch]=useSearchParams()
  const [Ticketdata, setTicketdata] = useState()

  function Getdate(dateString) {
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
    return `${formattedDate}`;
  }

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
    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  useEffect(() => {
  async function Fetchdata(){
try {
  const data=await fetch(BASE_URL+'/getticket?userId='+search.get('userId')+'&trainId='+search.get('trainId'))
  const response=await data.json()
  setTicketdata(response)
  if(response.success){
setTimeout(() => {
  generateTicketImage()
}, 3000);
  }
  

} catch (error) {
  console.log(error);
}
  }
  Fetchdata()
  }, [])
  
  const ticketRef = useRef(null);

  const generateTicketImage = () => {
    html2canvas(ticketRef.current).then((canvas) => {
      const ticketImage = canvas.toDataURL('image/png');
      // Now you can use `ticketImage` as needed, like displaying or downloading it
      // For downloading, you can create an <a> element and simulate a click to trigger download
      const link = document.createElement('a');
      link.download = 'train_ticket.png';
      link.href = ticketImage;
      link.click();
    });
  };
  return (
<>
<div ref={ticketRef} className="w-full max-w-md m-auto p-4 bg-orange-100 shadow-md rounded relative border-[2px] border-gray-600 border-dashed" >
<img src='/tr-bg.png' className='absolute top-0  w-[90%] opacity-30'/>

  <div className='z-20 relative'>
  <div className="flex justify-between mb-4   ">
    <h2 className="text-lg font-bold">Train Ticket</h2>
    <span className="uppercase font-bold text-lg">T{Ticketdata?.train._id.slice(0,10)}</span>
  </div>
  <div className="flex flex-wrap justify-between">
    <div className="md:w-1/2 px-4 mb-4">
      <label className="block text-sm text-gray-800  mb-1">Passenger</label>
      <span className="text-base text-gray-900 capitalize font-bold">{Ticketdata?.user?.FirstName} {Ticketdata?.user?.LastName}</span>
      <label className="block text-sm text-gray-800  mb-1">From</label>
      <span className="text-base text-gray-900 capitalize font-bold">{Ticketdata?.train?.Origin}</span>
      <label className="block text-sm text-gray-800  mb-1">To</label>
      <span className="text-base text-gray-900 capitalize font-bold">{Ticketdata?.train?.Destination}</span>
    </div>
    <div className=" md:w-1/2 px-4 mb-4">
      <label className="block text-sm text-gray-800  mb-1">Date</label>
      <span className="text-base text-gray-900 capitalize font-bold">{Getdate(Ticketdata?.train?.ArrivalTime)}</span>
      <label className="block text-sm text-gray-800  mb-1">Departure</label>
      <span className="text-base text-gray-900 capitalize font-bold">{Gettime(Ticketdata?.train?.DepartureTime)}</span>
      <label className="block text-sm text-gray-800  mb-1">Arrival</label>
      <span className="text-base text-gray-900 capitalize font-bold">{Gettime(Ticketdata?.train?.ArrivalTime)}</span>
    </div>
    <div className="flex 
 flex-col justify-between mb-4">
    <label className="block text-sm text-gray-800  ">Train No</label>
    <span className=" text-gray-900 font-bold text-xl">{Ticketdata?.train?.TrainNo}</span>
    <label className="block text-sm text-gray-800  ">Seat</label>
    <span className=" text-gray-900 font-bold text-xl">A{search.get('seat')}</span>
  </div>
  </div>
  </div>
  </div>
  {/* <button onClick={generateTicketImage}>Generate Ticket Image</button> */}
</>
  )
}

export default Ticket;