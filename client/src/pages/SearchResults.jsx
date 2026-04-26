import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './SearchResults.css';

const amenityIcons = {
  'WiFi':           '📶',
  'AC':             '❄️',
  'Charging Point': '🔌',
  'Water Bottle':   '💧',
  'Blanket':        '🛏️',
  'Snacks':         '🍫',
  'Sleeper Berth':  '🛌',
  'Reading Light':  '💡',
};

function BusCard({ bus, date }) {
  const navigate = useNavigate();

  return (
    <div className="bus-card">
      {/* Left — times */}
      <div className="bus-card__times">
        <div className="bus-card__time">
          <span className="time">{bus.departure}</span>
          <span className="city">{bus.from}</span>
        </div>
        <div className="bus-card__route">
          <span className="duration">{bus.duration}</span>
          <div className="route-line">
            <span className="dot" />
            <span className="line" />
            <span className="dot" />
          </div>
          <span className="direct">Direct</span>
        </div>
        <div className="bus-card__time">
          <span className="time">{bus.arrival}</span>
          <span className="city">{bus.to}</span>
        </div>
      </div>

      {/* Middle — details */}
      <div className="bus-card__details">
        <div className="bus-card__operator">
          <span className="operator-name">{bus.operatorName}</span>
          <span className="bus-number">#{bus.busNumber}</span>
        </div>
        <div className="bus-card__amenities">
          {bus.amenities.map(a => (
            <span className="amenity-tag" key={a}>
              {amenityIcons[a] || '✓'} {a}
            </span>
          ))}
        </div>
        <div className="bus-card__seats">
          <span className={bus.availableSeats <= 10 ? 'seats-low' : 'seats-ok'}>
            {bus.availableSeats <= 10
              ? `⚠️ Only ${bus.availableSeats} seats left`
              : `✅ ${bus.availableSeats} seats available`}
          </span>
        </div>
      </div>

      {/* Right — price + book */}
      <div className="bus-card__book">
        <div className="bus-card__price">
          <span className="price-label">per seat</span>
          <span className="price-amount">₹{bus.price}</span>
        </div>
        <button
          className="book-btn"
          onClick={() => navigate(`/seats/${bus.id}?date=${date}`)}
        >
          Book Now
        </button>
        <span className="women-only-tag">♀ Women Only</span>
      </div>
    </div>
  );
}

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    from: searchParams.get('from') || '',
    to:   searchParams.get('to')   || '',
    date: searchParams.get('date') || '',
  });

  const [buses, setBuses]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError]     = useState('');
  const [sortBy, setSortBy]   = useState('departure');

  // Auto-search if params are in URL on load
  useEffect(() => {
    if (form.from && form.to && form.date) fetchBuses(form);
  }, []);

  const fetchBuses = async (params) => {
    setLoading(true);
    setError('');
    setBuses([]);
    setSearched(true);
    try {
      const { data } = await api.get('/buses', {
        params: { from: params.from, to: params.to, date: params.date },
      });
      setBuses(data);
    } catch {
      setError('Failed to fetch buses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.date) return;
    setSearchParams({ from: form.from, to: form.to, date: form.date });
    fetchBuses(form);
  };

  const swap = () => setForm(f => ({ ...f, from: f.to, to: f.from }));

  const sorted = [...buses].sort((a, b) => {
    if (sortBy === 'price')     return a.price - b.price;
    if (sortBy === 'seats')     return b.availableSeats - a.availableSeats;
    if (sortBy === 'departure') return a.departure.localeCompare(b.departure);
    return 0;
  });

  const displayDate = form.date
    ? new Date(form.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="results-page">

      {/* ── Search bar ── */}
      <section className="results-search-bar">
        <div className="container">
          <form className="results-form" onSubmit={handleSearch}>
            <div className="results-form__field">
              <label>From</label>
              <input
                type="text"
                placeholder="Departure city"
                value={form.from}
                onChange={e => setForm(f => ({ ...f, from: e.target.value }))}
                required
              />
            </div>

            <button type="button" className="results-form__swap" onClick={swap} title="Swap">⇄</button>

            <div className="results-form__field">
              <label>To</label>
              <input
                type="text"
                placeholder="Destination city"
                value={form.to}
                onChange={e => setForm(f => ({ ...f, to: e.target.value }))}
                required
              />
            </div>

            <div className="results-form__field">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                required
              />
            </div>

            <button type="submit" className="results-form__btn">
              Search Buses
            </button>
          </form>
        </div>
      </section>

      <div className="container results-body">

        {/* ── Results header ── */}
        {searched && !loading && (
          <div className="results-header">
            <div className="results-header__info">
              {buses.length > 0 ? (
                <>
                  <h2>
                    {form.from} → {form.to}
                  </h2>
                  <p>{displayDate} &nbsp;·&nbsp; <strong>{buses.length}</strong> bus{buses.length !== 1 ? 'es' : ''} found</p>
                </>
              ) : (
                <h2>No buses found</h2>
              )}
            </div>

            {buses.length > 0 && (
              <div className="results-sort">
                <label>Sort by:</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="departure">Departure Time</option>
                  <option value="price">Price: Low to High</option>
                  <option value="seats">Most Seats Available</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="results-loading">
            <div className="results-spinner" />
            <p>Searching for buses…</p>
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="results-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* ── No results ── */}
        {searched && !loading && !error && buses.length === 0 && (
          <div className="results-empty">
            <div className="results-empty__icon">🚌</div>
            <h3>No buses found for this route</h3>
            <p>Try a different date or route. We're expanding to more cities every week!</p>
            <button className="book-btn" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        )}

        {/* ── Bus cards ── */}
        {!loading && sorted.length > 0 && (
          <div className="bus-list">
            {sorted.map(bus => (
              <BusCard key={bus.id} bus={bus} date={form.date} />
            ))}
          </div>
        )}

        {/* ── Initial state ── */}
        {!searched && !loading && (
          <div className="results-empty">
            <div className="results-empty__icon">🔍</div>
            <h3>Search for your route above</h3>
            <p>Enter departure city, destination, and date to find available buses.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default SearchResults;
