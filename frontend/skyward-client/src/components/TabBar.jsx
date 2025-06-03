import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Architecture', path: '/architecture' },
  { label: 'Booking Flow', path: '/booking-flow' },
  { label: 'Loyalty', path: '/loyalty' },
  { label: 'Notifications', path: '/notifications' },
  { label: 'Reports', path: '/reports' },
  { label: 'Journey Map', path: '/journey-map' }
]

export default function TabBar() {
  return (
    <div className="flex justify-center gap-1 mb-6">
      {tabs.map(tab => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `px-4 py-2 border rounded-md text-sm font-medium ${isActive ? 'bg-white border-gray-300 shadow' : 'bg-gray-100 text-gray-600'}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}
