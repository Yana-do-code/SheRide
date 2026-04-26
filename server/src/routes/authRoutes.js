// server/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware  = require('../middleware/auth');

// POST /auth/signup
router.post('/signup', authController.signup);

// POST /auth/login
router.post('/login', authController.login);

// GET  /auth/profile  (protected)
router.get('/profile', authMiddleware, authController.getProfile);

// PUT  /auth/profile  (protected)
router.put('/profile', authMiddleware, authController.updateProfile);

module.exports = router;
