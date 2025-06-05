import ServiceCard from '../components/ServiceCard'

const services = [
  { name: 'Booking Service', desc: 'Handles trip bookings and reservations', status: 'healthy', endpoints: 5, icon: '✈️' },
  { name: 'Payment Service', desc: 'Processes payments and refunds', status: 'healthy', endpoints: 4, icon: '💳' },
  { name: 'Loyalty Service', desc: 'Manages points and tier rewards', status: 'healthy', endpoints: 6, icon: '⭐' },
  { name: 'Notification Service', desc: 'Sends alerts and updates to users', status: 'healthy', endpoints: 4, icon: '🔔' },
  { name: 'Reporting Service', desc: 'Generates analytics and insights', status: 'healthy', endpoints: 3, icon: '📊' },
]

export default function Architecture() {
  return (
    <div className="flex flex-col w-full h-full min-h-full overflow-auto">
      {/* Services grid */}
      <div className="grid grid-cols-1 text-black sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {services.map((s, idx) => (
          <ServiceCard key={idx} {...s} />
        ))}
      </div>

      {/* Overview card */}
      <div className="bg-white shadow rounded-lg p-6 flex-shrink-0">
        <h2 className="text-lg text-black font-semibold mb-2">📑 Microservices Architecture Overview</h2>
        <p className="mb-4 text-black ">
          Skyward Travels uses a distributed microservices architecture where each service is responsible for a specific business domain and communicates through well-defined APIs.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-indigo-600 text-2xl font-bold">5</p>
            <p className="text-sm text-gray-500">Core Services</p>
          </div>
          <div>
            <p className="text-green-600 text-2xl font-bold">22</p>
            <p className="text-sm text-gray-500">API Endpoints</p>
          </div>
          <div>
            <p className="text-purple-600 text-2xl font-bold">8</p>
            <p className="text-sm text-gray-500">Event Types</p>
          </div>
        </div>
      </div>
    </div>
  )
}
