// client/src/pages/SeatSelection.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function SeatSelection() {
  const { busId } = useParams();

  return (
    <main>
      <h2>Select Your Seats</h2>
      <p>Bus ID: {busId}</p>
      {/* SeatLayout component and fare summary will go here */}
    </main>
  );
}

export default SeatSelection;
