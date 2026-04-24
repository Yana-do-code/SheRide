// server/src/utils/generateId.js
// Utility for generating simple mock IDs without a database

/**
 * Generate a booking ID in the format BK-XXXX.
 * Example: "BK-4821"
 */
function generateBookingId() {
  return `BK-${Math.floor(1000 + Math.random() * 9000)}`;
}

module.exports = { generateBookingId };
