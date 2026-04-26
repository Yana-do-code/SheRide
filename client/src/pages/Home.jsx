import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroBanner   from '../assets/hero-banner.png';
import womenTravel  from '../assets/women-travel.png';
import busFront     from '../assets/bus-hero.png';
import './Home.css';

/* ─── Data ─── */
const features = [
  {
    icon: '🛡️',
    title: 'Women-Only Safety',
    desc: 'Every seat, every journey — exclusively for women. Travel without worry.',
  },
  {
    icon: '📍',
    title: 'Live Tracking',
    desc: 'Real-time GPS tracking so your family always knows where you are.',
  },
  {
    icon: '💺',
    title: 'Comfortable Seats',
    desc: 'Ergonomic recliner seats with charging ports and clean restrooms.',
  },
  {
    icon: '🌙',
    title: 'Night-Safe Rides',
    desc: 'Travel after dark with confidence. Our buses run 24 × 7.',
  },
  {
    icon: '📞',
    title: '24/7 Support',
    desc: 'Dedicated women helpline available around the clock.',
  },
  {
    icon: '💳',
    title: 'Easy Booking',
    desc: 'Book, modify, or cancel in under 60 seconds — any device.',
  },
];

const steps = [
  { num: '01', title: 'Search Your Route', desc: 'Enter source, destination & travel date.' },
  { num: '02', title: 'Choose Your Seat',  desc: 'Pick from available seats on the bus layout.' },
  { num: '03', title: 'Confirm & Ride',    desc: 'Pay securely and get your e-ticket instantly.' },
];


const stats = [
  { value: '50K+',  label: 'Happy Riders' },
  { value: '200+',  label: 'Routes' },
  { value: '40+',   label: 'Cities' },
  { value: '4.9★',  label: 'App Rating' },
];

/* ─── Component ─── */
function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ from: '', to: '', date: '' });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.date) return;
    navigate(`/results?from=${form.from}&to=${form.to}&date=${form.date}`);
  };

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg-circles" aria-hidden="true">
          <div className="circle circle--1" />
          <div className="circle circle--2" />
          <div className="circle circle--3" />
        </div>

        <div className="container hero__inner">
          <div className="hero__text">
            <span className="hero__badge">♀ Women-Only Bus Service</span>
            <h1 className="hero__heading">
              Safe Rides<br />
              for <span className="highlight">Her</span>,&nbsp;
              by <span className="highlight">Her</span>
            </h1>
            <p className="hero__sub">
              Because your safety is our priority.
              Travel with comfort and confidence — every single trip.
            </p>
            <div className="hero__cta">
              <a href="#search" className="btn-primary hero__btn">Book a Ride</a>
              <a href="#how-it-works" className="btn-outline hero__btn">How It Works</a>
            </div>
          </div>
          <div className="hero__image">
            <img src={heroBanner} alt="SheRide women-only pink bus" />
          </div>
        </div>
      </section>

      {/* ── Search Box ── */}
      <section className="search-section" id="search">
        <div className="container">
          <div className="search-card">
            <h2 className="search-card__title">Find Your Bus</h2>
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-form__field">
                <label>From</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai"
                  value={form.from}
                  onChange={e => setForm({ ...form, from: e.target.value })}
                  required
                />
              </div>
              <div className="search-form__swap" onClick={() =>
                setForm({ ...form, from: form.to, to: form.from })
              } title="Swap">⇄</div>
              <div className="search-form__field">
                <label>To</label>
                <input
                  type="text"
                  placeholder="e.g. Pune"
                  value={form.to}
                  onChange={e => setForm({ ...form, to: e.target.value })}
                  required
                />
              </div>
              <div className="search-form__field">
                <label>Date</label>
                <input
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary search-form__btn">
                Search Buses
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="container stats-grid">
          {stats.map(s => (
            <div className="stat-card" key={s.label}>
              <span className="stat-card__value">{s.value}</span>
              <span className="stat-card__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why SheRide ── */}
      <section className="features-section">
        <div className="container">
          <p className="section-badge">Why Choose Us</p>
          <h2 className="section-title">Your Safety Is Our <span>Mission</span></h2>
          <p className="section-sub">Every feature of SheRide is designed with one goal — making women's travel safe, comfortable, and dignified.</p>
          <div className="features-grid">
            {features.map(f => (
              <div className="feature-card" key={f.title}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Banner ── */}
      <section className="community-section">
        <div className="container community-inner">
          <div className="community__image">
            <img src={womenTravel} alt="Women travelling together on SheRide" />
          </div>
          <div className="community__text">
            <span className="hero__badge">Our Community</span>
            <h2 className="section-title">
              Travel Together,<br /><span>Stay Safe Together</span> ♥
            </h2>
            <p>
              SheRide is more than a bus service — it's a community of women who look out for each other.
              Share rides, share stories, and reach your destination with a smile.
            </p>
            <a href="/signup" className="btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>
              Join the Community
            </a>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <p className="section-badge">Simple Steps</p>
          <h2 className="section-title">How It <span>Works</span></h2>
          <p className="section-sub">Book your safe ride in three easy steps.</p>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div className="step-card" key={s.num}>
                <div className="step-card__num">{s.num}</div>
                {i < steps.length - 1 && <div className="step-card__line" aria-hidden="true" />}
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section">
        <div className="container cta-inner">
          <div className="cta-text">
            <h2>Ready for a Safer Journey?</h2>
            <p>Join 50+ women who already travel with confidence.</p>
          </div>
          <div className="cta-buttons">
            <a href="/signup" className="btn-primary">Get Started</a>
            <a href="/results" className="btn-outline cta-outline">Search Buses</a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
