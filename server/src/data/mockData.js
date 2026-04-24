// server/src/data/mockData.js
// All application data is mocked here — no database required

/**
 * Generate a 40-seat layout in 2+2 configuration (10 rows).
 * Seats are numbered 1-40. A handful are pre-marked as booked.
 */
function generateSeats(preBookedNumbers = []) {
  return Array.from({ length: 40 }, (_, i) => {
    const number = i + 1;
    const col = ((i % 4) + 1); // 1-4 within each row
    return {
      id: `seat-${number}`,
      number,
      isBooked: preBookedNumbers.includes(number),
      isWindow: col === 1 || col === 4, // window seats are columns 1 and 4
    };
  });
}

const mockBuses = [
  {
    id: 'bus-001',
    busNumber: 'SR-1021',
    operatorName: 'PinkRoute Express',
    from: 'Mumbai',
    to: 'Pune',
    departure: '06:00',
    arrival: '09:30',
    duration: '3h 30m',
    price: 450,
    totalSeats: 40,
    availableSeats: 28,
    amenities: ['WiFi', 'Charging Point', 'AC', 'Water Bottle'],
    timing: ['06:00', '10:00', '14:00', '18:00'],
    seatLayout: generateSeats([3, 7, 12, 18, 25, 31, 36, 40, 2, 15, 22]),
  },
  {
    id: 'bus-002',
    busNumber: 'SR-2047',
    operatorName: 'SafeJourney Women Travels',
    from: 'Mumbai',
    to: 'Pune',
    departure: '10:00',
    arrival: '13:00',
    duration: '3h 00m',
    price: 550,
    totalSeats: 40,
    availableSeats: 15,
    amenities: ['AC', 'Blanket', 'Snacks', 'Charging Point'],
    timing: ['10:00', '16:00', '22:00'],
    seatLayout: generateSeats([1, 4, 8, 9, 10, 13, 17, 20, 24, 27, 30, 33, 35, 38, 39, 40, 2, 5, 11, 21, 28, 34, 37, 6, 14]),
  },
  {
    id: 'bus-003',
    busNumber: 'SR-3088',
    operatorName: 'HerPath Luxury Coaches',
    from: 'Mumbai',
    to: 'Pune',
    departure: '22:00',
    arrival: '01:30',
    duration: '3h 30m',
    price: 700,
    totalSeats: 40,
    availableSeats: 34,
    amenities: ['AC', 'Sleeper Berth', 'WiFi', 'Blanket', 'Charging Point', 'Reading Light'],
    timing: ['22:00', '23:30'],
    seatLayout: generateSeats([5, 16, 29, 37, 3, 22, 8]),
  },
];

module.exports = { mockBuses };
