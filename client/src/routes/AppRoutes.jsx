// client/src/routes/AppRoutes.jsx
// Centralized route definitions — add new routes here
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages (to be implemented)
import Home from '../pages/Home';
import SearchResults from '../pages/SearchResults';
import SeatSelection from '../pages/SeatSelection';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// Components
import Navbar from '../components/Navbar';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/seats/:busId" element={<SeatSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
