import React, { useState } from 'react';
import './Contact.css';

const contactInfo = [
  {
    icon: '📍',
    title: 'Our Location',
    lines: ['Dehradun, Uttarakhand', 'India — 248001'],
  },
  {
    icon: '📞',
    title: 'Call Us',
    lines: ['+91 9548503869', 'Mon – Sun, 24 × 7'],
  },
  {
    icon: '✉️',
    title: 'Email Us',
    lines: ['sherideforher@gmail.com', 'We reply within 24 hours'],
  },
  {
    icon: '⏰',
    title: 'Support Hours',
    lines: ['24 × 7 Helpline', 'Always here for you'],
  },
];

const faqs = [
  {
    q: 'Is SheRide available in my city?',
    a: 'SheRide currently operates across 40+ cities in India. Use the Search Buses feature to check routes available from your city.',
  },
  {
    q: 'Can I cancel or modify my booking?',
    a: 'Yes. You can cancel or modify your booking up to 2 hours before departure from your account dashboard. Refunds are processed within 5–7 business days.',
  },
  {
    q: 'Are all staff members women?',
    a: 'Yes — our drivers, conductors, and on-ground support staff are all women, ensuring a fully safe environment throughout your journey.',
  },
  {
    q: 'How do I track my bus live?',
    a: 'Once your booking is confirmed, you will find a live tracking link in your ticket confirmation email and in your account dashboard.',
  },
];

function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [openFaq, setOpenFaq] = useState(null);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.email.trim())   e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (!form.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    // Simulate send (wire to backend later)
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="contact-page">

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="contact-hero__bg" aria-hidden="true" />
        <div className="container contact-hero__inner">
          <span className="about-badge">Get In Touch</span>
          <h1>We'd Love to <span>Hear From You</span></h1>
          <p>
            Have a question, feedback, or just want to say hello?
            Our team is available 24 × 7 to help you with anything you need.
          </p>
        </div>
      </section>

      {/* ── Info cards ── */}
      <section className="contact-info-section">
        <div className="container contact-info-grid">
          {contactInfo.map((c) => (
            <div className="contact-info-card" key={c.title}>
              <div className="contact-info-card__icon">{c.icon}</div>
              <h3>{c.title}</h3>
              {c.lines.map((l) => <p key={l}>{l}</p>)}
            </div>
          ))}
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="contact-form-section">
        <div className="container contact-form-inner">

          {/* Form */}
          <div className="contact-form-box">
            <h2>Send Us a Message</h2>
            <p className="contact-form-box__sub">
              Fill out the form and we'll get back to you within 24 hours.
            </p>

            {status === 'success' && (
              <div className="contact-alert contact-alert--success">
                <span>✅</span>
                Thank you! Your message has been sent. We'll be in touch soon.
              </div>
            )}
            {status === 'error' && (
              <div className="contact-alert contact-alert--error">
                <span>⚠️</span>
                Something went wrong. Please try again or email us directly.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-row">
                <div className="contact-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name here"
                    value={form.name}
                    onChange={set('name')}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="contact-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={set('email')}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="contact-field">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  value={form.subject}
                  onChange={set('subject')}
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="field-error">{errors.subject}</span>}
              </div>

              <div className="contact-field">
                <label>Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={set('message')}
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button type="submit" className="contact-submit" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <><span className="spinner" /> Sending…</>
                ) : (
                  'Send Message ✉️'
                )}
              </button>
            </form>
          </div>

          {/* Side info */}
          <div className="contact-side">
            <div className="contact-side__card">
              <div className="contact-side__icon">💬</div>
              <h3>Chat With Us</h3>
              <p>For quick help, reach out on WhatsApp or our in-app chat. Response time under 5 minutes.</p>
              <a
                href="https://wa.me/919548503869"
                target="_blank"
                rel="noreferrer"
                className="btn-primary contact-wa-btn"
              >
                WhatsApp Us
              </a>
            </div>

            <div className="contact-side__card">
              <div className="contact-side__icon">🛡️</div>
              <h3>Emergency Helpline</h3>
              <p>If you feel unsafe during a journey, call our dedicated women's safety helpline immediately.</p>
              <a href="tel:+919548503869" className="contact-helpline">
                +91 9548503869
              </a>
            </div>

            <div className="contact-side__socials">
              <p>Follow us</p>
              <div className="contact-social-links">
                <a href="#" aria-label="Instagram" className="contact-social-btn">📸 Instagram</a>
                <a href="#" aria-label="Twitter"   className="contact-social-btn">🐦 Twitter</a>
                <a href="#" aria-label="Facebook"  className="contact-social-btn">📘 Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="contact-faq">
        <div className="container">
          <span className="about-badge">FAQs</span>
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          <p className="section-sub">Can't find what you're looking for? Send us a message above.</p>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div
                className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`}
                key={i}
              >
                <button
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq-item__arrow">{openFaq === i ? '▲' : '▼'}</span>
                </button>
                <div className="faq-item__answer">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;
