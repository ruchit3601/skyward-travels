import { useEffect, useState } from 'react';
import { Bell, Trash2 } from 'lucide-react';

const sampleEvents = [
  "Booking Confirmed ✅",
  "Payment Failed ❌",
  "Loyalty Points Added 🎁",
  "New Offer Available 🔔",
  "Tier Upgraded to Gold 🥇"
];

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    inApp: true,
  });

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      setNotifications(prev => [{ id: Date.now(), message: newNotification }, ...prev]);
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const togglePreference = (type) => {
    setPreferences(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
        <Bell className="text-indigo-500" /> Notification Center
      </h2>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <h3 className="font-medium mb-2 text-black">Notification Preferences</h3>
        <div className="flex gap-4">
          {["email", "sms", "inApp"].map(type => (
            <label key={type} className="flex text-black items-center gap-2">
              <input
                type="checkbox"
                checked={preferences[type]}
                onChange={() => togglePreference(type)}
                className="form-checkbox text-black"
              />
              {type.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white text-black rounded shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-black">Real-time Alerts</h3>
          <button onClick={clearNotifications} className="text-sm text-red-500 flex items-center gap-1 hover:underline">
            <Trash2 size={16} /> Clear All
          </button>
        </div>

        {notifications.length === 0 ? (
          <p className="text-gray-500 italic">No notifications yet...</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.map((n) => (
              <li key={n.id} className="flex justify-between items-center bg-indigo-50 p-2 rounded">
                <span>{n.message}</span>
                <button
                  onClick={() => dismissNotification(n.id)}
                  className="text-xs text-gray-500 hover:text-red-500"
                >
                  Dismiss
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
