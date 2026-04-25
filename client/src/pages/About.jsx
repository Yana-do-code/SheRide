import React from 'react';
import { Link } from 'react-router-dom';
import sheideLogo   from '../assets/sheride-logo.png';
import womenTravel  from '../assets/women-travel.png';
import heroBanner   from '../assets/hero-banner.png';
import './About.css';

const values = [
  {
    icon: '🛡️',
    title: 'Safety First',
    desc: 'Every bus, every route, every seat — reserved exclusively for women. No compromise, ever.',
  },
  {
    icon: '💕',
    title: 'Built by Women, for Women',
    desc: 'Our team understands the challenges women face while travelling and designs every feature around them.',
  },
  {
    icon: '🌍',
    title: 'Community & Inclusion',
    desc: 'We believe every woman deserves the freedom to travel — regardless of the hour or destination.',
  },
  {
    icon: '🔒',
    title: 'Privacy & Trust',
    desc: 'Your data, your journey, your privacy. We never share your information with third parties.',
  },
];

const team = [
  {
    name: 'Yana Pandey',
    role: 'Founder & CEO',
    initials: 'YP',
    quote: '"Every woman deserves to travel without fear."',
  },
  {
    name: 'Prakriti Bijalwan',
    role: 'Head of Operations',
    initials: 'PM',
    quote: '"Safe rides are not a luxury — they are a right."',
  },
  {
    name: 'Yash Pachera',
    role: 'Lead Engineer',
    initials: 'AR',
    quote: '"Technology should empower, not intimidate."',
  },
];


function About() {
  return (
    <div className="about-page">

      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero__bg" aria-hidden="true" />
        <div className="container about-hero__inner">
          <div className="about-hero__text">
            <span className="about-badge">Our Story</span>
            <h1>
              We Exist Because<br />
              <span>Safety Should Never</span><br />
              Be a Privilege
            </h1>
            <p>
              SheRide was born from a simple but powerful belief — that every woman
              deserves to travel freely, safely, and with dignity. We are not just a
              bus service; we are a movement.
            </p>
            <Link to="/signup" className="btn-primary">Join Our Community</Link>
          </div>
          <div className="about-hero__image">
            <img src={sheideLogo} alt="SheRide Logo" className="about-hero__logo-img" />
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="about-mission">
        <div className="container about-mission__inner">
          <div className="about-mission__image">
            <img src={heroBanner} alt="SheRide bus on the road" />
          </div>
          <div className="about-mission__text">
            <span className="about-badge">Our Mission</span>
            <h2>Safe Rides for <span>Her</span>, by <span>Her</span></h2>
            <p>
              At SheRide, our mission is to transform women's travel in India by
              providing a platform that is exclusively designed, managed, and operated
              with women's safety at its core.
            </p>
            <p>
              From late-night intercity journeys to daily commutes, we ensure that
              every woman who boards a SheRide bus feels secure, respected, and
              comfortable — every single time.
            </p>
            <div className="about-mission__stats">
              <div className="about-stat">
                <strong>50K+</strong>
                <span>Happy Riders</span>
              </div>
              <div className="about-stat">
                <strong>40+</strong>
                <span>Cities Covered</span>
              </div>
              <div className="about-stat">
                <strong>200+</strong>
                <span>Daily Routes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values">
        <div className="container">
          <span className="about-badge">What We Stand For</span>
          <h2 className="section-title">Our Core <span>Values</span></h2>
          <p className="section-sub">
            Everything we build, every decision we make, is guided by these principles.
          </p>
          <div className="about-values__grid">
            {values.map(v => (
              <div className="about-value-card" key={v.title}>
                <div className="about-value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="about-team">
        <div className="container">
          <span className="about-badge">The People Behind SheRide</span>
          <h2 className="section-title">Meet Our <span>Team</span></h2>
          <p className="section-sub">Passionate women building a safer world, one ride at a time.</p>
          <div className="about-team__grid">
            {team.map(t => (
              <div className="team-card" key={t.name}>
                <div className="team-card__avatar">{t.initials}</div>
                <h3>{t.name}</h3>
                <span className="team-card__role">{t.role}</span>
                <p className="team-card__quote">{t.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community image ── */}
      <section className="about-community">
        <div className="container about-community__inner">
          <div className="about-community__image">
            <img src={womenTravel} alt="Women travelling together on SheRide" />
          </div>
          <div className="about-community__text">
            <span className="about-badge">Travel Together</span>
            <h2 className="section-title">
              More Than a Bus,<br />
              <span>A Safe Space</span> ♥
            </h2>
            <p>
              When you board a SheRide bus, you're joining thousands of women who
              choose safety, comfort, and sisterhood over compromise. Share your journey,
              make new friends, and arrive with a smile.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
              <Link to="/signup" className="btn-primary">Get Started</Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
