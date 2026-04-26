const { bookSeats }                    = require('../data/bookingsStore');
const { mockBuses }                    = require('../data/mockData');
const { sendBookingConfirmationEmail } = require('../utils/mailer');

const createBooking = (req, res) => {
  const { busId, seatNumbers, passengerName, passengers, email, phone, date, totalAmount } = req.body;

  if (!busId || !seatNumbers?.length || !email || !date) {
    return res.status(400).json({ message: 'Missing required booking details.' });
  }

  // Check for seat conflicts and lock them
  const result = bookSeats(busId, date, seatNumbers);
  if (!result.ok) {
    return res.status(409).json({
      message: `Seat ${result.conflict} was just booked by someone else. Please choose a different seat.`,
    });
  }

  const bookingId = `BK-${Date.now().toString(36).toUpperCase()}`;
  const bus       = mockBuses.find(b => b.id === busId);

  // Send booking confirmation email (non-blocking)
  // Build display name: first passenger or fallback
  const displayName = (passengers && passengers.length > 0)
    ? passengers[0].name
    : (passengerName || 'Passenger');

  if (bus) {
    sendBookingConfirmationEmail({
      toEmail:       email,
      passengerName: displayName,
      bookingId,
      from:          bus.from,
      to:            bus.to,
      departure:     bus.departure,
      arrival:       bus.arrival,
      date,
      operatorName:  bus.operatorName,
      busNumber:     bus.busNumber,
      seatNumbers,
      totalAmount,
    }).catch(err => console.error('[mailer] Booking email failed:', err.message));
  }

  return res.status(201).json({
    message: 'Booking confirmed!',
    bookingId,
    details: { busId, seatNumbers, passengerName: displayName, passengers, email, phone, date, totalAmount },
  });
};

module.exports = { createBooking };
