import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Auth.css';

function Login() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login: authLogin } = useAuth();

  const [form, setForm]       = useState({ emailOrPhone: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert]     = useState(null);

  // Redirect back to where user came from, or home
  const from = location.state?.from?.pathname || '/';

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: '' }));
    setAlert(null);
  };

  const validate = () => {
    const e = {};
    if (!form.emailOrPhone.trim()) e.emailOrPhone = 'Email or phone number is required.';
    if (!form.password)            e.password     = 'Password is required.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setAlert(null);
    try {
      const { data } = await api.post('/auth/login', {
        emailOrPhone: form.emailOrPhone.trim(),
        password:     form.password,
      });
      authLogin(data.token, data.user);
      setAlert({ type: 'success', msg: data.message });
      setTimeout(() => navigate(from, { replace: true }), 900);
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.';
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
          Welcome Back!<br />Safe to See You Again 💕
        </h2>
        <p className="auth-panel__sub">
          Log in to manage your bookings, track your bus live, and travel with the confidence you deserve.
        </p>
        <ul className="auth-panel__perks">
          <li>
            <span>🎟️</span>
            <span>View &amp; manage your tickets</span>
          </li>
          <li>
            <span>📍</span>
            <span>Track your ride in real time</span>
          </li>
          <li>
            <span>🔔</span>
            <span>Get alerts &amp; notifications</span>
          </li>
          <li>
            <span>💳</span>
            <span>Saved payment methods</span>
          </li>
        </ul>
      </div>

      {/* ── Right form ── */}
      <div className="auth-form-panel">
        <div className="auth-box">
          <h1 className="auth-box__title">Sign In</h1>
          <p className="auth-box__sub">
            New to SheRide?{' '}
            <Link to="/signup">Create a free account</Link>
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
            {/* Email or Phone */}
            <div className="form-group">
              <label htmlFor="emailOrPhone">Email or Phone Number</label>
              <input
                id="emailOrPhone"
                type="text"
                placeholder="your.email@example.com or 9876543210"
                value={form.emailOrPhone}
                onChange={set('emailOrPhone')}
                className={errors.emailOrPhone ? 'error' : ''}
                autoComplete="username"
                autoFocus
              />
              {errors.emailOrPhone && (
                <span className="field-error">{errors.emailOrPhone}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={set('password')}
                  className={errors.password ? 'error' : ''}
                  autoComplete="current-password"
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
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            {/* Forgot password link */}
            <div style={{ textAlign: 'right', marginTop: '-10px', marginBottom: '20px' }}>
              <Link
                to="#"
                style={{ fontSize: '0.82rem', color: 'var(--pink-600)', fontWeight: 600 }}
              >
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? 'Signing In…' : 'Sign In ♀'}
            </button>
          </form>

          <div className="auth-divider" style={{ marginTop: '24px' }}>
            <span>or continue with</span>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--gray)', marginTop: '12px', lineHeight: '1.6' }}>
            Don't have an account yet?{' '}
            <Link to="/signup" style={{ color: 'var(--pink-600)', fontWeight: 700 }}>
              Sign up for free →
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
