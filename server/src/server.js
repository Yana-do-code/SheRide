// server/src/server.js
// Express application entry point
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// --- Routes ---
app.use('/auth', authRoutes);
app.use('/buses', busRoutes);
app.use('/booking', bookingRoutes);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', app: 'SheRide API' }));

app.listen(PORT, () => {
  console.log(`SheRide server running on http://localhost:${PORT}`);
});
