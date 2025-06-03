export default function BookingFlow() {
  const steps = [
    {
      title: 'Booking Initiated',
      description: 'User searched and selected a flight',
      service: 'Booking Service',
      icon: '🔍',
      status: 'success',
      timestamp: '2025-06-03 12:45:12'
    },
    {
      title: 'Payment Processed',
      description: 'Payment completed successfully',
      service: 'Payment Service',
      icon: '💳',
      status: 'success',
      timestamp: '2025-06-03 12:45:17'
    },
    {
      title: 'Loyalty Points Added',
      description: '50 points credited to the user',
      service: 'Loyalty Service',
      icon: '⭐',
      status: 'success',
      timestamp: '2025-06-03 12:45:21'
    },
    {
      title: 'Notification Sent',
      description: 'Booking confirmation email & SMS sent',
      service: 'Notification Service',
      icon: '📧',
      status: 'success',
      timestamp: '2025-06-03 12:45:25'
    }
  ]

  return (
    <div className="flex flex-col min-h-screen w-full p-6 bg-gray-50">
      <div className="bg-white shadow rounded-lg p-6 flex-grow overflow-auto">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">🧾 Booking Flow Simulation</h2>
        <p className="text-gray-600 mb-6">
          Below is a simulated journey of a customer booking a flight with Skyward Travels.
          Each step represents a microservice interaction.
        </p>

        <div className="space-y-6 border-l-2 border-indigo-300 pl-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-3 top-1.5 w-6 h-6 bg-indigo-500 text-white flex items-center justify-center rounded-full shadow">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
                <div className="text-sm text-gray-400">
                  <span className="mr-2">{step.timestamp}</span>
                  <span className="text-green-600 font-medium">{step.status.toUpperCase()}</span>
                </div>
                <span className="text-xs text-gray-500">Service: {step.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
