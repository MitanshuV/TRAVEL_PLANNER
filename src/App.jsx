import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/reusables/Navbar";
import Footer from "@/components/reusables/Footer";
// import ContactPage from "./components/ContactPage";
import Homepage from "./components/homepage/Homepage";
import TravelPreferencesForm from "./components/TravelPreferencesForm";
import "./App.css";
import MyTrips from "./components/trips/MyTrips";
import TripDetails from "./components/trips/TripDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen body">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-trip" element={<TravelPreferencesForm />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          <Route path="/my-trips" element={<MyTrips />} />
          <Route path="/tripDetails/:id" element={<TripDetails />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
