const { mockBuses }     = require('../data/mockData');
const { getBookedSeats } = require('../data/bookingsStore');

const getBuses = (req, res) => {
  const { from, to } = req.query;
  let results = mockBuses;
  if (from) results = results.filter(b => b.from.toLowerCase() === from.toLowerCase());
  if (to)   results = results.filter(b => b.to.toLowerCase()   === to.toLowerCase());
  return res.status(200).json(results);
};

const getBusById = (req, res) => {
  const bus = mockBuses.find(b => b.id === req.params.id);
  if (!bus) return res.status(404).json({ message: 'Bus not found.' });

  const { date } = req.query;

  // Merge live booked seats (from booking store) into the seat layout
  let seatLayout = bus.seatLayout;
  if (date) {
    const liveBooked = new Set(getBookedSeats(bus.id, date));
    seatLayout = bus.seatLayout.map(seat => ({
      ...seat,
      isBooked: seat.isBooked || liveBooked.has(seat.number),
    }));
  }

  return res.status(200).json({ ...bus, seatLayout });
};

module.exports = { getBuses, getBusById };
