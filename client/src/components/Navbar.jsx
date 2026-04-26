import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [dropdownOpen, setDropdown]   = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const { user, isLoggedIn, logout }  = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menu and dropdown on route change
  useEffect(() => { setMenuOpen(false); setDropdown(false); }, [location]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : '';

  const displayName = user ? `${user.firstName} ${user.lastName}` : '';

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">♀</span>
          <span className="navbar__logo-text">
            She<span>Ride</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links">
          <Link to="/"        className={isActive('/')        ? 'active' : ''}>Home</Link>
          <Link to="/about"   className={isActive('/about')   ? 'active' : ''}>About Us</Link>
          <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact Us</Link>
          <Link to="/results" className={isActive('/results') ? 'active' : ''}>Search Buses</Link>
        </nav>

        {/* Auth area */}
        <div className="navbar__auth">
          {isLoggedIn ? (
            <div className="nav-profile" ref={dropdownRef}>
              <button
                className="nav-profile__btn"
                onClick={() => setDropdown(o => !o)}
                aria-expanded={dropdownOpen}
              >
                <span className="nav-profile__avatar">{initials}</span>
                <span className="nav-profile__name">{user?.firstName}</span>
                <span className={`nav-profile__arrow${dropdownOpen ? ' open' : ''}`}>▾</span>
              </button>

              {dropdownOpen && (
                <div className="nav-profile__dropdown">
                  <div className="nav-profile__dropdown-header">
                    <span className="nav-profile__dropdown-name">{displayName}</span>
                    <span className="nav-profile__dropdown-email">{user?.email}</span>
                  </div>
                  <button
                    className="nav-profile__dropdown-item"
                    onClick={() => { setDropdown(false); navigate('/dashboard'); }}
                  >
                    <span className="nav-profile__dropdown-icon">👤</span> Dashboard
                  </button>
                  <button
                    className="nav-profile__dropdown-item nav-profile__dropdown-item--logout"
                    onClick={handleLogout}
                  >
                    <span className="nav-profile__dropdown-icon">🚪</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login"  className="btn-outline">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`}>
        <Link to="/"        className={isActive('/')        ? 'active' : ''}>Home</Link>
        <Link to="/about"   className={isActive('/about')   ? 'active' : ''}>About Us</Link>
        <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact Us</Link>
        <Link to="/results" className={isActive('/results') ? 'active' : ''}>Search Buses</Link>

        {isLoggedIn ? (
          <div className="navbar__drawer-profile">
            <div className="navbar__drawer-profile-info">
              <span className="nav-profile__avatar nav-profile__avatar--sm">{initials}</span>
              <div>
                <div className="navbar__drawer-profile-name">{displayName}</div>
                <div className="navbar__drawer-profile-email">{user?.email}</div>
              </div>
            </div>
            <button className="navbar__drawer-profile-btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="navbar__drawer-profile-btn navbar__drawer-profile-btn--logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navbar__drawer-auth">
            <Link to="/login"  className="btn-outline">Login</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
