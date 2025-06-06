import ServiceCard from '../components/ServiceCard'

const services = [
  { name: 'Booking Service', desc: 'Handles trip bookings and reservations', status: 'healthy', endpoints: 5, icon: '✈️' },
  { name: 'Payment Service', desc: 'Processes payments and refunds', status: 'healthy', endpoints: 4, icon: '💳' },
  { name: 'Loyalty Service', desc: 'Manages points and tier rewards', status: 'healthy', endpoints: 6, icon: '⭐' },
  { name: 'Notification Service', desc: 'Sends alerts and updates to users', status: 'healthy', endpoints: 4, icon: '🔔' },
  { name: 'Reporting Service', desc: 'Generates analytics and insights', status: 'healthy', endpoints: 3, icon: '📊' },
]

const apiEndpoints = [
  { service: 'Booking Service', endpoints: ['/book-trip', '/cancel-trip', '/get-trips', '/trip-details', '/user-history'] },
  { service: 'Payment Service', endpoints: ['/initiate-payment', '/verify-payment', '/refund', '/payment-history'] },
  { service: 'Loyalty Service', endpoints: ['/get-points', '/redeem-points', '/loyalty-status', '/tier-progress', '/earn-points', '/adjust-points'] },
  { service: 'Notification Service', endpoints: ['/send-email', '/send-sms', '/push-alert', '/preferences'] },
  { service: 'Reporting Service', endpoints: ['/daily-summary', '/monthly-insights', '/user-behavior'] },
]

const events = [
  'BookingConfirmed',
  'BookingCancelled',
  'PaymentSuccessful',
  'PaymentFailed',
  'PointsRedeemed',
  'PointsAwarded',
  'AlertTriggered',
  'ReportGenerated'
]

export default function Architecture() {
  return (
    <div className="flex flex-col w-full h-full min-h-full overflow-auto px-6 pb-20 pt-6 space-y-10 text-black">

      {/* Overview */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">📑 Microservices Architecture Overview</h2>
        <p className="mb-4">
          Skyward Travels uses a distributed microservices architecture where each service is responsible for a specific business domain and communicates through well-defined APIs. The architecture enables scalability, reliability, and independent deployment of services.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-indigo-600 text-3xl font-bold">5</p>
            <p className="text-sm text-gray-500">Core Services</p>
          </div>
          <div>
            <p className="text-green-600 text-3xl font-bold">22</p>
            <p className="text-sm text-gray-500">API Endpoints</p>
          </div>
          <div>
            <p className="text-purple-600 text-3xl font-bold">8</p>
            <p className="text-sm text-gray-500">Event Types</p>
          </div>
        </div>
      </div>

      {/* Core Services */}
      <div>
        <h3 className="text-lg font-semibold mb-4">🧩 Core Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((s, idx) => (
            <ServiceCard key={idx} {...s} />
          ))}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">🔗 API Endpoints</h3>
        <div className="space-y-4">
          {apiEndpoints.map((api, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-indigo-600">{api.service}</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {api.endpoints.map((ep, i) => (
                  <li key={i}>{ep}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Event Types */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">📢 Event Types</h3>
        <p className="text-sm text-gray-700 mb-2">These are domain events used for service communication (pub-sub model):</p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 list-disc list-inside text-sm text-gray-800">
          {events.map((e, idx) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">🗺️ System Interaction Diagram</h3>
        <p className="mb-2 text-sm text-gray-600">This diagram visualizes the communication between services via APIs and events.</p>
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
          <img
            src="/images/architecture-diagram.png"
            alt="Skyward Travels Microservices Architecture"
            className="max-h-96 mx-auto rounded-md shadow-md object-contain"
          />
        </div>
      </div>

      {/* Mock API Contracts */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">📘 Sample API Contracts</h3>

        {/* Booking */}
        <div className="mb-6">
          <h4 className="font-semibold text-indigo-600 mb-2">Booking Service</h4>
          <pre className="bg-gray-100 text-sm rounded p-4 overflow-x-auto text-black">
{`POST /book-trip
Request:
{
  "userId": "user123",
  "tripId": "trip456",
  "date": "2025-07-01"
}

Response:
{
  "status": "success",
  "bookingId": "BKG1024",
  "pointsEarned": 100
}`}
          </pre>
        </div>

        {/* Payment */}
        <div className="mb-6">
          <h4 className="font-semibold text-indigo-600 mb-2">Payment Service</h4>
          <pre className="bg-gray-100 text-sm rounded p-4 overflow-x-auto text-black">
{`POST /initiate-payment
Request:
{
  "bookingId": "BKG1024",
  "amount": 250.00,
  "method": "credit"
}

Response:
{
  "status": "processed",
  "transactionId": "TXN9001",
  "loyaltyPointsUsed": 50
}`}
          </pre>
        </div>

        {/* Loyalty */}
        <div className="mb-6">
          <h4 className="font-semibold text-indigo-600 mb-2">Loyalty Service</h4>
          <pre className="bg-gray-100 text-sm rounded p-4 overflow-x-auto text-black">
{`GET /get-points?userId=user123

Response:
{
  "totalPoints": 420,
  "tier": "Gold",
  "nextTier": "Platinum",
  "pointsToNextTier": 180
}`}
          </pre>
        </div>

        {/* Notification */}
        <div className="mb-6">
          <h4 className="font-semibold text-indigo-600 mb-2">Notification Service</h4>
          <pre className="bg-gray-100 text-sm rounded p-4 overflow-x-auto text-black">
{`POST /send-email
Request:
{
  "to": "user@example.com",
  "subject": "Booking Confirmed",
  "body": "Your trip to Paris is booked!"
}

Response:
{
  "status": "sent",
  "deliveryTime": "2025-06-06T10:00:00Z"
}`}
          </pre>
        </div>

        {/* Reporting */}
        <div>
          <h4 className="font-semibold text-indigo-600 mb-2">Reporting Service</h4>
          <pre className="bg-gray-100 text-sm rounded p-4 overflow-x-auto text-black">
{`GET /daily-summary?date=2025-06-06

Response:
{
  "totalBookings": 82,
  "revenue": 15420.75,
  "topDestination": "New York"
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
