import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home          from '../pages/Home';
import About         from '../pages/About';
import Contact       from '../pages/Contact';
import SearchResults from '../pages/SearchResults';
import SeatSelection from '../pages/SeatSelection';
import Login         from '../pages/Login';
import Signup        from '../pages/Signup';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/results"     element={<SearchResults />} />
        <Route path="/seats/:busId" element={<SeatSelection />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/signup"      element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppRoutes;
