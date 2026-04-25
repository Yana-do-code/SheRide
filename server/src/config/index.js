require('dotenv').config();

module.exports = {
  port:         process.env.PORT          || 5000,
  nodeEnv:      process.env.NODE_ENV      || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri:     process.env.MONGO_URI,
  jwtSecret:    process.env.JWT_SECRET    || 'changeme',
  smtp: {
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user:   process.env.SMTP_USER   || '',
    pass:   process.env.SMTP_PASS   || '',
  },
};
