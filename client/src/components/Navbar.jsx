import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

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
          <Link to="/"         className={isActive('/')         ? 'active' : ''}>Home</Link>
          <Link to="/about"    className={isActive('/about')    ? 'active' : ''}>About Us</Link>
          <Link to="/contact"  className={isActive('/contact')  ? 'active' : ''}>Contact Us</Link>
          <Link to="/results"  className={isActive('/results')  ? 'active' : ''}>Search Buses</Link>
        </nav>

        {/* Auth buttons */}
        <div className="navbar__auth">
          <Link to="/login"  className="btn-outline">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
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
        <div className="navbar__drawer-auth">
          <Link to="/login"  className="btn-outline">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
