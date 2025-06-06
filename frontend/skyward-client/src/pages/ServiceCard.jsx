import { motion } from 'framer-motion'

export default function ServiceCard({ name, desc, status, endpoints, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow p-4 text-center space-y-2"
    >
      <div className="text-3xl">{icon}</div>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
      <div className="text-xs text-green-600">{status}</div>
      <div className="text-xs text-gray-500">{endpoints} endpoints</div>
    </motion.div>
  )
}
