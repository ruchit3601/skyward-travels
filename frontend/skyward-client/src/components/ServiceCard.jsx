export default function ServiceCard({ name, desc, status, endpoints, icon }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-500 text-sm mb-2">{desc}</p>
      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full mb-1">{status}</span>
      <span className="text-sm text-gray-600">{endpoints} endpoints</span>
    </div>
  )
}
