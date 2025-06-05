import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TabBar from "./components/TabBar";
import Architecture from "./pages/Architecture";
import BookingFlow from "./pages/BookingFlow";
import Loyalty from "./pages/Loyalty";
import Notifications from "./pages/Notifications";
import Reporting from "./pages/Reporting";
import JourneyMap from "./pages/JourneyMap";

// (Optional) Context providers if you use Loyalty, Notification, etc.
// import { LoyaltyProvider } from './context/LoyaltyContext';
// import { NotificationProvider } from './context/NotificationContext';

export default function App() {
  return (
    // Wrap with providers if needed
    // <LoyaltyProvider>
    // <NotificationProvider>
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 px-4 py-4">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">
            ✈️ Skyward Travels
          </h1>
          <p className="text-gray-600 mb-4">
            Microservices Architecture Simulation Dashboard
          </p>

          {/* Service Status */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 text-sm">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">✅ All Services Online</span>
            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">5 Microservices</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Real-time Event Bus</span>
          </div>

          {/* Tab Navigation */}
          <TabBar />
        </header>

        {/* Main Content */}
        <main className="flex-grow mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/architecture" replace />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/booking-flow" element={<BookingFlow />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/journey-map" element={<JourneyMap />} />
          </Routes>
        </main>

        {/* Footer (optional) */}
        <footer className="text-center text-sm text-gray-400 mt-8 mb-2">
          © {new Date().getFullYear()} Skyward Travels · Powered by React & Tailwind
        </footer>
      </div>
    </Router>
    // </NotificationProvider>
    // </LoyaltyProvider>
  );
}
