import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './SeatSelection.css';

const MAX_SEATS = 4;

/* ── Seat component ── */
function Seat({ seat, isSelected, onToggle }) {
  const status = seat.isBooked ? 'booked' : isSelected ? 'selected' : 'available';
  return (
    <button
      className={`seat seat--${status}`}
      onClick={() => !seat.isBooked && onToggle(seat)}
      disabled={seat.isBooked}
      title={seat.isBooked ? `Seat ${seat.number} — Booked` : `Seat ${seat.number}`}
    >
      {seat.number}
    </button>
  );
}

/* ── Bus layout: 2+2, 10 rows ── */
function BusLayout({ seats, selected, onToggle }) {
  // Group into rows of 4
  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  return (
    <div className="bus-layout">
      {/* Driver cabin */}
      <div className="bus-layout__cabin">
        <span className="cabin-icon">🚌</span>
        <span className="cabin-label">Driver</span>
      </div>

      {/* Column headers */}
      <div className="bus-layout__header">
        <span />
        <span>A</span>
        <span>B</span>
        <span className="aisle-label">Aisle</span>
        <span>C</span>
        <span>D</span>
      </div>

      {/* Seat rows */}
      <div className="bus-layout__rows">
        {rows.map((row, ri) => (
          <div className="bus-row" key={ri}>
            <span className="row-num">{ri + 1}</span>
            <Seat seat={row[0]} isSelected={selected.some(s => s.id === row[0].id)} onToggle={onToggle} />
            <Seat seat={row[1]} isSelected={selected.some(s => s.id === row[1].id)} onToggle={onToggle} />
            <div className="aisle" />
            <Seat seat={row[2]} isSelected={selected.some(s => s.id === row[2].id)} onToggle={onToggle} />
            <Seat seat={row[3]} isSelected={selected.some(s => s.id === row[3].id)} onToggle={onToggle} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bus-layout__legend">
        <div className="legend-item"><div className="legend-box available" />Available</div>
        <div className="legend-item"><div className="legend-box selected"  />Selected</div>
        <div className="legend-item"><div className="legend-box booked"    />Booked</div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
function SeatSelection() {
  const { busId }           = useParams();
  const [searchParams]      = useSearchParams();
  const navigate            = useNavigate();

  const date = searchParams.get('date') || '';

  const [bus, setBus]             = useState(null);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState([]);
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [passengers, setPassengers] = useState([]);
  const [errors, setErrors]       = useState({});
  const [booking, setBooking]     = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    api.get(`/buses/${busId}`, { params: { date } })
      .then(({ data }) => setBus(data))
      .catch(() => navigate('/results'))
      .finally(() => setLoading(false));
  }, [busId, date]);

  const toggleSeat = (seat) => {
    setSelected(prev => {
      const already = prev.some(s => s.id === seat.id);
      let next;
      if (already) {
        next = prev.filter(s => s.id !== seat.id);
      } else {
        if (prev.length >= MAX_SEATS) return prev;
        next = [...prev, seat];
      }
      setPassengers(ps => {
        const updated = [...ps];
        while (updated.length < next.length) updated.push({ name: '', age: '' });
        return updated.slice(0, next.length);
      });
      return next;
    });
    setErrors(er => ({ ...er, seats: '' }));
  };

  const setPassengerField = (index, field) => (e) => {
    setPassengers(ps => ps.map((p, i) => i === index ? { ...p, [field]: e.target.value } : p));
    setErrors(er => ({ ...er, [`p_${index}_${field}`]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email.';
    if (!phone.trim()) e.phone = 'Phone is required.';
    if (selected.length === 0) e.seats = 'Please select at least one seat.';
    passengers.forEach((p, i) => {
      if (!p.name.trim()) e[`p_${i}_name`] = 'Name is required.';
      if (!p.age) e[`p_${i}_age`] = 'Age is required.';
      else if (p.age < 5 || p.age > 100) e[`p_${i}_age`] = 'Enter a valid age (5–100).';
    });
    return e;
  };

  const handleBook = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setBooking(true);
    try {
      const { data } = await api.post('/booking', {
        busId,
        seatNumbers:   selected.map(s => s.number),
        passengerName: passengers[0]?.name || '',
        passengers,
        email,
        phone,
        date,
        totalAmount:   selected.length * bus.price,
      });
      setConfirmed(data);
    } catch {
      setErrors({ submit: 'Booking failed. Please try again.' });
    } finally {
      setBooking(false);
    }
  };

  const displayDate = date
    ? new Date(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  const total = selected.length * (bus?.price || 0);
  const tax   = Math.round(total * 0.05);

  /* ── Confirmed screen ── */
  if (confirmed) {
    return (
      <div className="booking-confirmed">
        <div className="confirmed-card">
          <div className="confirmed-icon">✅</div>
          <h2>Booking Confirmed!</h2>
          <p className="confirmed-id">Booking ID: <strong>{confirmed.bookingId}</strong></p>
          <div className="confirmed-details">
            <div className="confirmed-row"><span>Route</span><strong>{bus.from} → {bus.to}</strong></div>
            <div className="confirmed-row"><span>Date</span><strong>{displayDate}</strong></div>
            <div className="confirmed-row"><span>Departure</span><strong>{bus.departure}</strong></div>
            <div className="confirmed-row"><span>Seats</span><strong>{selected.map(s => s.number).join(', ')}</strong></div>
            <div className="confirmed-row"><span>Passengers</span><strong>{passengers.map(p => p.name).join(', ')}</strong></div>
            <div className="confirmed-row total"><span>Total Paid</span><strong>₹{total + tax}</strong></div>
          </div>
          <p className="confirmed-email">A confirmation has been sent to <strong>{email}</strong></p>
          <div className="confirmed-actions">
            <button className="book-confirm-btn" onClick={() => navigate('/')}>Back to Home</button>
            <button className="book-outline-btn" onClick={() => navigate('/results')}>Search More Buses</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="seat-loading">
        <div className="results-spinner" />
        <p>Loading bus details…</p>
      </div>
    );
  }

  return (
    <div className="seat-page">

      {/* ── Bus info bar ── */}
      <div className="seat-infobar">
        <div className="container seat-infobar__inner">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
          <div className="infobar-route">
            <span className="infobar-city">{bus.from}</span>
            <span className="infobar-arrow">→</span>
            <span className="infobar-city">{bus.to}</span>
          </div>
          <div className="infobar-meta">
            <span>🕐 {bus.departure} – {bus.arrival}</span>
            <span>📅 {displayDate}</span>
            <span>🚌 {bus.operatorName}</span>
          </div>
          <div className="infobar-price">₹{bus.price} <small>/ seat</small></div>
        </div>
      </div>

      <div className="container seat-body">

        {/* ── Left: seat map ── */}
        <div className="seat-left">
          <h2 className="seat-section-title">Select Your Seat(s)</h2>
          <p className="seat-section-sub">You can select up to {MAX_SEATS} seats. Click a seat to select/deselect.</p>
          {errors.seats && <div className="seat-field-error">⚠️ {errors.seats}</div>}
          <BusLayout seats={bus.seatLayout} selected={selected} onToggle={toggleSeat} />
        </div>

        {/* ── Right: form + summary ── */}
        <div className="seat-right">

          {/* Passenger details */}
          <div className="passenger-form-card">
            <h3>Passenger Details</h3>
            <form onSubmit={handleBook} noValidate>

              {/* Per-seat passenger rows */}
              {selected.length === 0 ? (
                <p className="pform-hint">Select seats to fill passenger details.</p>
              ) : (
                passengers.map((p, i) => (
                  <div key={selected[i]?.id} className="pform-passenger-block">
                    <div className="pform-passenger-label">
                      Seat {selected[i]?.number} {selected[i]?.isWindow ? '🪟' : '🪑'} — Passenger {i + 1}
                    </div>
                    <div className="pform-row">
                      <div className="pform-field">
                        <label>Full Name</label>
                        <input
                          type="text"
                          placeholder="Full name"
                          value={p.name}
                          onChange={setPassengerField(i, 'name')}
                          className={errors[`p_${i}_name`] ? 'error' : ''}
                        />
                        {errors[`p_${i}_name`] && <span className="pform-error">{errors[`p_${i}_name`]}</span>}
                      </div>
                      <div className="pform-field pform-field--age">
                        <label>Age</label>
                        <input
                          type="number"
                          placeholder="Age"
                          min="5"
                          max="100"
                          value={p.age}
                          onChange={setPassengerField(i, 'age')}
                          className={errors[`p_${i}_age`] ? 'error' : ''}
                        />
                        {errors[`p_${i}_age`] && <span className="pform-error">{errors[`p_${i}_age`]}</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Shared contact details */}
              <div className="pform-divider">Contact for Booking Confirmation</div>
              <div className="pform-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: '' })); }}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="pform-error">{errors.email}</span>}
              </div>
              <div className="pform-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setErrors(er => ({ ...er, phone: '' })); }}
                  maxLength={10}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="pform-error">{errors.phone}</span>}
              </div>

              {/* Booking summary */}
              <div className="booking-summary">
                <h4>Booking Summary</h4>
                {selected.length === 0 ? (
                  <p className="summary-empty">No seats selected yet.</p>
                ) : (
                  <>
                    <div className="summary-seats">
                      {selected.map(s => (
                        <span key={s.id} className="summary-seat-tag">
                          Seat {s.number} {s.isWindow ? '🪟' : '🪑'}
                        </span>
                      ))}
                    </div>
                    <div className="summary-lines">
                      <div className="summary-line">
                        <span>₹{bus.price} × {selected.length} seat{selected.length > 1 ? 's' : ''}</span>
                        <span>₹{total}</span>
                      </div>
                      <div className="summary-line">
                        <span>GST (5%)</span>
                        <span>₹{tax}</span>
                      </div>
                      <div className="summary-line summary-total">
                        <span>Total</span>
                        <span>₹{total + tax}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {errors.submit && <div className="seat-field-error">⚠️ {errors.submit}</div>}

              <button
                type="submit"
                className="confirm-btn"
                disabled={booking || selected.length === 0}
              >
                {booking ? <><span className="spinner" /> Confirming…</> : `Confirm Booking — ₹${total + tax}`}
              </button>

              <p className="booking-note">♀ Women-only bus · Secure payment · Free cancellation up to 2hrs before departure</p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
