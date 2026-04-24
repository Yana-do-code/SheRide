// server/src/controllers/bookingController.js

const createBooking = (req, res) => {
  const { busId, seatNumbers, passengerName, email } = req.body;

  // Generate a simple mock booking ID
  const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

  return res.status(201).json({
    message: 'Booking confirmed!',
    bookingId,
    details: {
      busId,
      seatNumbers,
      passengerName,
      email,
    },
  });
};

module.exports = { createBooking };
