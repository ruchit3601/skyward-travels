import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import TabBar from './components/TabBar'
import Architecture from './pages/Architecture'
import BookingFlow from './pages/BookingFlow'
import Loyalty from './pages/Loyalty'
import Notifications from './pages/Notifications'
import Reporting from './pages/Reporting'
import JourneyMap from './pages/JourneyMap'

export default function App() {
  return (
    <Router>
      {/* Make the entire page a flex column layout */}
      <div className="flex flex-col min-h-screen bg-gray-50 px-4 py-4">
        {/* Header */}
        <header>
          <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">
            ✈️ Skyward Travels
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Microservices Architecture Simulation
          </p>

          <div className="flex justify-center gap-2 mb-6">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">✅ All Services Online</span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">5 Microservices</span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">Real-time Event Bus</span>
          </div>

          <TabBar />
        </header>

        {/* This container will grow to fill remaining space */}
        <main className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/architecture" />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/booking-flow" element={<BookingFlow />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/journey-map" element={<JourneyMap />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
