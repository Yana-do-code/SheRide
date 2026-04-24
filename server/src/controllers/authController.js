// server/src/controllers/authController.js

const signup = (req, res) => {
  const { name, email, password, gender } = req.body;

  // SheRide is exclusively for female passengers
  if (gender !== 'female') {
    return res.status(400).json({
      message: 'SheRide is exclusively for female passengers.',
    });
  }

  // Placeholder — full implementation will go here
  return res.status(201).json({
    message: 'Signup successful',
    user: { name, email },
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Placeholder — mock auth accepts any female-registered credentials
  return res.status(200).json({
    message: 'Login successful',
    token: 'mock-token-123',
    user: { email },
  });
};

module.exports = { signup, login };
