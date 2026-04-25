import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Auth.css';

/* ─── Password strength helper ─── */
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8)               score++;
  if (/[A-Z]/.test(pw))             score++;
  if (/[0-9]/.test(pw))             score++;
  if (/[^A-Za-z0-9]/.test(pw))      score++;
  return score; // 0-4
}
const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthClass = ['', 'filled-weak', 'filled-fair', 'filled-good', 'filled-strong'];

function StrengthMeter({ password }) {
  const score = getStrength(password);
  if (!password) return null;
  return (
    <div className="strength-meter">
      <div className="strength-meter__bars">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`strength-meter__bar ${i <= score ? strengthClass[score] : ''}`}
          />
        ))}
      </div>
      <span className="strength-meter__label">
        Password strength: <strong>{strengthLabel[score]}</strong>
      </span>
    </div>
  );
}

/* ─── Signup Page ─── */
function Signup() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '',
  });
  const [errors, setErrors]     = useState({});
  const [showPw, setShowPw]     = useState(false);
  const [showCf, setShowCf]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [alert, setAlert]       = useState(null); // { type: 'error'|'success', msg }

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: '' }));
    setAlert(null);
  };

  /* — Validation — */
  const validate = () => {
    const e = {};
    if (!form.firstName.trim())                    e.firstName = 'First name is required.';
    if (!form.lastName.trim())                     e.lastName  = 'Last name is required.';
    if (!form.email.trim())                        e.email     = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                                   e.email     = 'Enter a valid email address.';
    if (!form.phone.trim())                        e.phone     = 'Phone number is required.';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
                                                   e.phone     = 'Enter a valid 10-digit Indian mobile number.';
    if (!form.password)                            e.password  = 'Password is required.';
    else if (form.password.length < 8)             e.password  = 'Password must be at least 8 characters.';
    if (!form.confirm)                             e.confirm   = 'Please confirm your password.';
    else if (form.confirm !== form.password)       e.confirm   = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setAlert(null);
    try {
      const { data } = await api.post('/auth/signup', {
        firstName: form.firstName.trim(),
        lastName:  form.lastName.trim(),
        email:     form.email.trim(),
        phone:     form.phone.trim(),
        password:  form.password,
      });
      authLogin(data.token, data.user);
      setAlert({ type: 'success', msg: data.message });
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed. Please try again.';
      setAlert({ type: 'error', msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ── Left panel ── */}
      <div className="auth-panel">
        <div className="auth-panel__logo">
          <div className="auth-panel__logo-icon">♀</div>
          <div className="auth-panel__logo-text">She<span>Ride</span></div>
        </div>
        <h2 className="auth-panel__heading">
          Join the Safest<br />Ride Community
        </h2>
        <p className="auth-panel__sub">
          Thousands of women travel safely every day with SheRide. Create your account and experience the difference.
        </p>
        <ul className="auth-panel__perks">
          <li>
            <span>🛡️</span>
            <span>100% women-only buses</span>
          </li>
          <li>
            <span>📍</span>
            <span>Real-time GPS tracking</span>
          </li>
          <li>
            <span>💌</span>
            <span>Welcome email on signup</span>
          </li>
          <li>
            <span>📞</span>
            <span>24/7 dedicated support</span>
          </li>
        </ul>
      </div>

      {/* ── Right form ── */}
      <div className="auth-form-panel">
        <div className="auth-box">
          <h1 className="auth-box__title">Create Account</h1>
          <p className="auth-box__sub">
            Already have an account?{' '}
            <Link to="/login">Sign in here</Link>
          </p>

          {alert && (
            <div className={`auth-alert auth-alert--${alert.type}`}>
              <span className="auth-alert__icon">
                {alert.type === 'success' ? '✅' : '⚠️'}
              </span>
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Name row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name here"
                  value={form.firstName}
                  onChange={set('firstName')}
                  className={errors.firstName ? 'error' : ''}
                  autoComplete="given-name"
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name here"
                  value={form.lastName}
                  onChange={set('lastName')}
                  className={errors.lastName ? 'error' : ''}
                  autoComplete="family-name"
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={set('email')}
                className={errors.email ? 'error' : ''}
                autoComplete="email"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={set('phone')}
                className={errors.phone ? 'error' : ''}
                autoComplete="tel"
                maxLength={10}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={set('password')}
                  className={errors.password ? 'error' : ''}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
              <StrengthMeter password={form.password} />
            </div>

            {/* Confirm password */}
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  id="confirm"
                  type={showCf ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={form.confirm}
                  onChange={set('confirm')}
                  className={errors.confirm ? 'error' : ''}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowCf((v) => !v)}
                  aria-label={showCf ? 'Hide password' : 'Show password'}
                >
                  {showCf ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirm && <span className="field-error">{errors.confirm}</span>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? 'Creating Account…' : 'Create My Account ♀'}
            </button>
          </form>

          <p style={{ marginTop: '20px', fontSize: '0.78rem', color: 'var(--gray)', textAlign: 'center', lineHeight: '1.6' }}>
            By signing up you agree to our{' '}
            <Link to="#" style={{ color: 'var(--pink-600)' }}>Terms of Service</Link>
            {' '}and{' '}
            <Link to="#" style={{ color: 'var(--pink-600)' }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Signup;
