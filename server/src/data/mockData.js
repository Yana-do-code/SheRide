function generateSeats() {
  return Array.from({ length: 40 }, (_, i) => {
    const number = i + 1;
    const col = ((i % 4) + 1);
    return {
      id: `seat-${number}`,
      number,
      isBooked: false,
      isWindow: col === 1 || col === 4,
    };
  });
}

const mockBuses = [
  // ── Mumbai → Pune ──
  {
    id: 'bus-001', busNumber: 'SR-1021', operatorName: 'PinkRoute Express',
    from: 'Mumbai', to: 'Pune',
    departure: '06:00', arrival: '09:30', duration: '3h 30m',
    price: 450, totalSeats: 40, availableSeats: 40,
    amenities: ['WiFi', 'Charging Point', 'AC', 'Water Bottle'],
    seatLayout: generateSeats(),
  },
  {
    id: 'bus-002', busNumber: 'SR-2047', operatorName: 'SafeJourney Women Travels',
    from: 'Mumbai', to: 'Pune',
    departure: '10:00', arrival: '13:00', duration: '3h 00m',
    price: 550, totalSeats: 40, availableSeats: 40,
    amenities: ['AC', 'Blanket', 'Snacks', 'Charging Point'],
    seatLayout: generateSeats(),
  },
  {
    id: 'bus-003', busNumber: 'SR-3088', operatorName: 'HerPath Luxury Coaches',
    from: 'Mumbai', to: 'Pune',
    departure: '22:00', arrival: '01:30', duration: '3h 30m',
    price: 700, totalSeats: 40, availableSeats: 40,
    amenities: ['AC', 'Sleeper Berth', 'WiFi', 'Blanket', 'Charging Point', 'Reading Light'],
    seatLayout: generateSeats(),
  },
  // ── Delhi → Dehradun ──
  {
    id: 'bus-004', busNumber: 'SR-4011', operatorName: 'SheSafe Travels',
    from: 'Delhi', to: 'Dehradun',
    departure: '07:00', arrival: '12:30', duration: '5h 30m',
    price: 600, totalSeats: 40, availableSeats: 40,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle'],
    seatLayout: generateSeats(),
  },
  {
    id: 'bus-005', busNumber: 'SR-4052', operatorName: 'HerRoute Express',
    from: 'Delhi', to: 'Dehradun',
    departure: '14:00', arrival: '19:30', duration: '5h 30m',
    price: 650, totalSeats: 40, availableSeats: 40,
    amenities: ['AC', 'Snacks', 'Blanket', 'Charging Point'],
    seatLayout: generateSeats(),
  },
  {
    id: 'bus-006', busNumber: 'SR-4093', operatorName: 'PinkRoute Luxury',
    from: 'Delhi', to: 'Dehradun',
    departure: '22:30', arrival: '04:00', duration: '5h 30m',
    price: 850, totalSeats: 40, availableSeats: 40,
    amenities: ['AC', 'Sleeper Berth', 'WiFi', 'Blanket', 'Charging Point', 'Reading Light'],
    seatLayout: generateSeats(),
  },
  // ── Bangalore → Chennai ──
  {
    id: 'bus-007', busNumber: 'SR-5021', operatorName: 'SheRide South Express',
    from: 'Bangalore', to: 'Chennai',
    departure: '08:00', arrival: '14:00', duration: '6h 00m',
    price: 700, totalSeats: 40, availableSeats: 40,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle', 'Snacks'],
    seatLayout: generateSeats(),
  },
  {
    id: 'bus-008', busNumber: 'SR-5067', operatorName: 'SafePath Coaches',
    from: 'Bangalore', to: 'Chennai',
    departure: '20:00', arrival: '02:00', duration: '6h 00m',
    price: 900, totalSeats: 40, availableSeats: 40,
    amenities: ['AC', 'Sleeper Berth', 'WiFi', 'Blanket', 'Charging Point'],
    seatLayout: generateSeats(),
  },
  // ── Jaipur → Delhi ──
  {
    id: 'bus-009', busNumber: 'SR-6031', operatorName: 'PinkWheels Express',
    from: 'Jaipur', to: 'Delhi',
    departure: '05:30', arrival: '10:30', duration: '5h 00m',
    price: 500, totalSeats: 40, availableSeats: 40,
    amenities: ['AC', 'Charging Point', 'Water Bottle'],
    seatLayout: generateSeats(),
  },
  {
    id: 'bus-010', busNumber: 'SR-6072', operatorName: 'HerSafe Travels',
    from: 'Jaipur', to: 'Delhi',
    departure: '15:00', arrival: '20:00', duration: '5h 00m',
    price: 550, totalSeats: 40, availableSeats: 40,
    amenities: ['AC', 'WiFi', 'Snacks', 'Charging Point'],
    seatLayout: generateSeats(),
  },
];

module.exports = { mockBuses };
