const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const { jwtSecret } = require('../config');
const { sendWelcomeEmail } = require('../utils/mailer');

const signToken = (userId) =>
  jwt.sign({ id: userId }, jwtSecret, { expiresIn: '7d' });

/* ══════════════════════════════
   POST /auth/signup
══════════════════════════════ */
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Duplicate checks
    const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const existingPhone = await User.findOne({ phone: phone.trim() });
    if (existingPhone) {
      return res.status(409).json({ message: 'An account with this phone number already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save user
    const user = await User.create({
      firstName: firstName.trim(),
      lastName:  lastName.trim(),
      email:     email.toLowerCase().trim(),
      phone:     phone.trim(),
      password:  hashedPassword,
    });

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.firstName).catch((err) =>
      console.error('[mailer] Welcome email failed:', err.message)
    );

    const token = signToken(user._id);

    return res.status(201).json({
      message: 'Account created successfully! Welcome to SheRide.',
      token,
      user: {
        id:        user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        phone:     user.phone,
      },
    });
  } catch (err) {
    // Mongoose duplicate key error
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(409).json({
        message: `An account with this ${field} already exists.`,
      });
    }
    console.error('[signup]', err);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

/* ══════════════════════════════
   POST /auth/login
══════════════════════════════ */
const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: 'Email/phone and password are required.' });
    }

    const identifier = emailOrPhone.trim();

    // Find by email or phone
    const user = await User.findOne(
      identifier.includes('@')
        ? { email: identifier.toLowerCase() }
        : { phone: identifier }
    );

    if (!user) {
      return res.status(401).json({ message: 'No account found with that email or phone number.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    const token = signToken(user._id);

    return res.status(200).json({
      message: 'Login successful! Welcome back.',
      token,
      user: {
        id:        user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        phone:     user.phone,
      },
    });
  } catch (err) {
    console.error('[login]', err);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
};

module.exports = { signup, login };
