const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { port, mongoUri, clientOrigin } = require('./config');
const authRoutes    = require('./routes/authRoutes');
const busRoutes     = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// ── Middleware ──────────────────────────────────────
app.use(cors({ origin: clientOrigin }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────
app.use('/auth',    authRoutes);
app.use('/buses',   busRoutes);
app.use('/booking', bookingRoutes);

app.get('/health', (_req, res) =>
  res.json({ status: 'ok', app: 'SheRide API', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
);

// ── Connect to MongoDB then start server ─────────────
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(port, () =>
      console.log(`🚌 SheRide server running on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
