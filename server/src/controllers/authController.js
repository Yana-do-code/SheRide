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

/* ══════════════════════════════
   GET /auth/profile  (protected)
══════════════════════════════ */
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.json({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone });
  } catch (err) {
    console.error('[getProfile]', err);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

/* ══════════════════════════════
   PUT /auth/profile  (protected)
══════════════════════════════ */
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // If changing password, verify current one first
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to set a new password.' });
      }
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Current password is incorrect.' });
      }
      if (newPassword.length < 8) {
        return res.status(400).json({ message: 'New password must be at least 8 characters.' });
      }
      user.password = await bcrypt.hash(newPassword, 12);
    }

    // Check uniqueness for email/phone if changed
    if (email && email.toLowerCase().trim() !== user.email) {
      const conflict = await User.findOne({ email: email.toLowerCase().trim() });
      if (conflict) return res.status(409).json({ message: 'That email is already in use.' });
      user.email = email.toLowerCase().trim();
    }
    if (phone && phone.trim() !== user.phone) {
      const conflict = await User.findOne({ phone: phone.trim() });
      if (conflict) return res.status(409).json({ message: 'That phone number is already in use.' });
      user.phone = phone.trim();
    }

    if (firstName) user.firstName = firstName.trim();
    if (lastName)  user.lastName  = lastName.trim();

    await user.save();

    return res.json({
      message: 'Profile updated successfully.',
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone },
    });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      return res.status(409).json({ message: `That ${field} is already in use.` });
    }
    console.error('[updateProfile]', err);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = { signup, login, getProfile, updateProfile };
