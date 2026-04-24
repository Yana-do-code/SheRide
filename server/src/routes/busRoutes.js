// server/src/routes/busRoutes.js
const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');

// GET /buses?from=&to=&date=
router.get('/', busController.getBuses);

module.exports = router;
