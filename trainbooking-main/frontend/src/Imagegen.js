import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

function TicketComponent() {
    let ticketData={
        passengerName:"abc",
        trainNumber:600
    }
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
    <div>
      <div ref={ticketRef}>
        <h2>Train Ticket</h2>
        <p><strong>Passenger Name:</strong> {ticketData.passengerName}</p>
        <p><strong>Train Number:</strong> {ticketData.trainNumber}</p>
        {/* Add other ticket details as needed */}
      </div>
      <button onClick={generateTicketImage}>Generate Ticket Image</button>
    </div>
  );
}

export default TicketComponent;
