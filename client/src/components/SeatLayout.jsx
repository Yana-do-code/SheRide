// client/src/components/SeatLayout.jsx
import React from 'react';

// Props:
//   seats         — array of seat objects from the bus
//   selectedSeats — array of selected seat IDs
//   onSeatSelect  — callback(seatId) invoked when a seat is clicked
function SeatLayout({ seats = [], selectedSeats = [], onSeatSelect }) {
  return (
    <div>
      <p>Seat layout will be rendered here (2+2, 10 rows)</p>
      {/* Color coding: green = available, red = booked, purple = selected */}
    </div>
  );
}

export default SeatLayout;
