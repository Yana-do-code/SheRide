// In-memory seat booking store
// Key: `${busId}::${date}`
// Value: [{ seatNumber, bookedAt }]

const EXPIRY_MS = 12 * 60 * 60 * 1000; // 12 hours

const store = new Map();

function _key(busId, date) {
  return `${busId}::${date}`;
}

function _clean(entries) {
  const now = Date.now();
  return entries.filter(e => now - e.bookedAt < EXPIRY_MS);
}

/** Returns booked seat numbers (not expired) for a bus+date */
function getBookedSeats(busId, date) {
  const key = _key(busId, date);
  if (!store.has(key)) return [];
  const fresh = _clean(store.get(key));
  store.set(key, fresh);
  return fresh.map(e => e.seatNumber);
}

/** Adds seat numbers as booked. Returns false if any seat is already taken. */
function bookSeats(busId, date, seatNumbers) {
  const key     = _key(busId, date);
  const current = _clean(store.get(key) || []);
  const takenSet = new Set(current.map(e => e.seatNumber));

  const conflict = seatNumbers.find(n => takenSet.has(n));
  if (conflict) return { ok: false, conflict };

  const now = Date.now();
  const updated = [
    ...current,
    ...seatNumbers.map(n => ({ seatNumber: n, bookedAt: now })),
  ];
  store.set(key, updated);
  return { ok: true };
}

module.exports = { getBookedSeats, bookSeats };
