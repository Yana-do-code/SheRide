import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const { user, isLoggedIn, updateUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName:       '',
    lastName:        '',
    email:           '',
    phone:           '',
    currentPassword: '',
    newPassword:     '',
    confirmPassword: '',
  });
  const [errors, setErrors]   = useState({});
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, [isLoggedIn]);

  // Pre-fill from context
  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        firstName: user.firstName || '',
        lastName:  user.lastName  || '',
        email:     user.email     || '',
        phone:     user.phone     || '',
      }));
    }
  }, [user]);

  const setF = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: '' }));
    setSuccess('');
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim())  e.lastName  = 'Last name is required.';
    if (!form.email.trim())     e.email     = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.phone.trim())     e.phone     = 'Phone is required.';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number.';

    if (form.newPassword) {
      if (!form.currentPassword) e.currentPassword = 'Enter your current password to change it.';
      if (form.newPassword.length < 8) e.newPassword = 'New password must be at least 8 characters.';
      if (form.newPassword !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    }
    return e;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSaving(true);
    setSuccess('');
    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName:  form.lastName.trim(),
        email:     form.email.trim(),
        phone:     form.phone.trim(),
      };
      if (form.newPassword) {
        payload.currentPassword = form.currentPassword;
        payload.newPassword     = form.newPassword;
      }

      const { data } = await api.put('/auth/profile', payload);
      updateUser(data.user);
      setSuccess('Profile updated successfully!');
      setForm(f => ({ ...f, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed. Please try again.';
      setErrors({ submit: msg });
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">

        {/* Header card */}
        <div className="dashboard-hero">
          <div className="dashboard-avatar">{initials}</div>
          <div>
            <h1 className="dashboard-hero-name">{user.firstName} {user.lastName}</h1>
            <p className="dashboard-hero-email">{user.email}</p>
          </div>
        </div>

        <div className="dashboard-grid">

          {/* Edit profile form */}
          <div className="dashboard-card">
            <h2 className="dashboard-card-title">Edit Profile</h2>

            <form onSubmit={handleSave} noValidate>
              <div className="dform-row">
                <div className="dform-field">
                  <label>First Name</label>
                  <input type="text" value={form.firstName} onChange={setF('firstName')} className={errors.firstName ? 'error' : ''} />
                  {errors.firstName && <span className="dform-error">{errors.firstName}</span>}
                </div>
                <div className="dform-field">
                  <label>Last Name</label>
                  <input type="text" value={form.lastName} onChange={setF('lastName')} className={errors.lastName ? 'error' : ''} />
                  {errors.lastName && <span className="dform-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="dform-field">
                <label>Email Address</label>
                <input type="email" value={form.email} onChange={setF('email')} className={errors.email ? 'error' : ''} />
                {errors.email && <span className="dform-error">{errors.email}</span>}
              </div>

              <div className="dform-field">
                <label>Phone Number</label>
                <input type="tel" value={form.phone} onChange={setF('phone')} maxLength={10} className={errors.phone ? 'error' : ''} />
                {errors.phone && <span className="dform-error">{errors.phone}</span>}
              </div>

              <div className="dform-divider">Change Password <span>(leave blank to keep current)</span></div>

              <div className="dform-field">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" value={form.currentPassword} onChange={setF('currentPassword')} className={errors.currentPassword ? 'error' : ''} />
                {errors.currentPassword && <span className="dform-error">{errors.currentPassword}</span>}
              </div>

              <div className="dform-row">
                <div className="dform-field">
                  <label>New Password</label>
                  <input type="password" placeholder="Min 8 characters" value={form.newPassword} onChange={setF('newPassword')} className={errors.newPassword ? 'error' : ''} />
                  {errors.newPassword && <span className="dform-error">{errors.newPassword}</span>}
                </div>
                <div className="dform-field">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Repeat new password" value={form.confirmPassword} onChange={setF('confirmPassword')} className={errors.confirmPassword ? 'error' : ''} />
                  {errors.confirmPassword && <span className="dform-error">{errors.confirmPassword}</span>}
                </div>
              </div>

              {errors.submit && <div className="dform-submit-error">⚠️ {errors.submit}</div>}
              {success       && <div className="dform-success">✅ {success}</div>}

              <button type="submit" className="dform-save-btn" disabled={saving}>
                {saving ? <><span className="spinner" /> Saving…</> : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Account info side card */}
          <div className="dashboard-card dashboard-card--info">
            <h2 className="dashboard-card-title">Account Info</h2>
            <div className="dinfo-row">
              <span className="dinfo-label">Full Name</span>
              <span className="dinfo-value">{user.firstName} {user.lastName}</span>
            </div>
            <div className="dinfo-row">
              <span className="dinfo-label">Email</span>
              <span className="dinfo-value">{user.email}</span>
            </div>
            <div className="dinfo-row">
              <span className="dinfo-label">Phone</span>
              <span className="dinfo-value">{user.phone}</span>
            </div>
            <div className="dinfo-note">
              ♀ You are a valued member of the SheRide community. Travel safe!
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
