// src/pages/Notifications.jsx
import React, { useState } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const triggerNotification = (type, message) => {
    const id = Date.now();
    const newNotif = {
      id,
      type,
      message,
      time: new Date().toLocaleTimeString(),
    };
    setNotifications([newNotif, ...notifications]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>

      <div className="flex gap-4">
        <button
          onClick={() =>
            triggerNotification('booking', 'Booking confirmed! Seat A12 secured.')
          }
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Trigger Booking Notification
        </button>
        <button
          onClick={() =>
            triggerNotification('loyalty', 'You earned 300 loyalty points!')
          }
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Trigger Loyalty Notification
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start p-4 border-l-4 rounded shadow-md transition-all ${
              notif.type === 'booking'
                ? 'bg-blue-50 border-blue-500'
                : 'bg-green-50 border-green-500'
            }`}
          >
            <div className="flex-shrink-0 mt-1">
              {notif.type === 'booking' ? (
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 11V9a4 4 0 118 0v2a4 4 0 11-8 0zM4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-gray-800 font-semibold">{notif.message}</p>
              <p className="text-xs text-gray-400">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
