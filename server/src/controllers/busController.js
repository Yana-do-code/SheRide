// server/src/controllers/busController.js
const { mockBuses } = require('../data/mockData');

const getBuses = (req, res) => {
  const { from, to, date } = req.query;

  // Filter by from/to if provided; date is accepted but used for display only
  let results = mockBuses;

  if (from) {
    results = results.filter(
      (bus) => bus.from.toLowerCase() === from.toLowerCase()
    );
  }

  if (to) {
    results = results.filter(
      (bus) => bus.to.toLowerCase() === to.toLowerCase()
    );
  }

  return res.status(200).json(results);
};

module.exports = { getBuses };
