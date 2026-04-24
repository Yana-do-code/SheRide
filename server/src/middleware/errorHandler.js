// server/src/middleware/errorHandler.js
// Global Express error-handling middleware
// Usage: app.use(errorHandler) — must be registered AFTER all routes

function errorHandler(err, req, res, next) {
  console.error(`[Error] ${err.message}`);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
