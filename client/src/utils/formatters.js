// client/src/utils/formatters.js
// Pure utility functions for formatting display values

/**
 * Format a price number into a readable currency string.
 * Example: 850 -> "₹850"
 */
export function formatPrice(amount) {
  return `\u20B9${amount}`;
}

/**
 * Format duration in minutes to hours and minutes.
 * Example: 150 -> "2h 30m"
 */
export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}
