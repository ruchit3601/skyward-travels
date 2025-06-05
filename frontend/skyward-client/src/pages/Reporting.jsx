import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { eventBus } from '@/utils/eventBus'; // make sure eventBus import

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getTodayIndex() {
  return new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
}

function initEmptyWeeklyData() {
  return Array(7).fill(0);
}

function loadWeeklyData(key) {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === 7) return parsed;
    } catch {}
  }
  return initEmptyWeeklyData();
}

function saveWeeklyData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export default function Reporting() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  // Load stats and weekly booking/payment arrays from localStorage
  const loadStats = () => {
    const bookings = parseInt(localStorage.getItem('totalBookings') || '0');
    const payments = parseInt(localStorage.getItem('totalPayments') || '0');
    const loyaltyPoints = parseInt(localStorage.getItem('loyaltyPoints') || '0');

    // Load weekly booking/payment arrays (7 days)
    const weeklyBookings = loadWeeklyData('weeklyBookings');
    const weeklyPayments = loadWeeklyData('weeklyPayments');

    setStats({
      bookings,
      payments,
      loyaltyPoints,
      chartData: {
        labels: DAYS,
        bookings: weeklyBookings,
        payments: weeklyPayments,
      },
      tierDistribution: {
        Gold: 15,
        Silver: 45,
        Bronze: 40,
      },
    });

    setLoading(false);
  };

  useEffect(() => {
    loadStats();

    eventBus.on('reporting.update', loadStats);
    return () => eventBus.off('reporting.update', loadStats);
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-500">Loading report data...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Reporting Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={stats.bookings} color="blue" />
        <StatCard title="Payments Completed" value={stats.payments} color="green" />
        <StatCard title="Loyalty Points Issued" value={stats.loyaltyPoints} color="purple" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-5 rounded shadow border">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Weekly Booking Trends</h2>
          <Line
            data={{
              labels: stats.chartData.labels,
              datasets: [
                {
                  label: 'Bookings',
                  data: stats.chartData.bookings,
                  borderColor: '#3B82F6',
                  fill: false,
                },
                {
                  label: 'Payments',
                  data: stats.chartData.payments,
                  borderColor: '#10B981',
                  fill: false,
                },
              ],
            }}
          />
        </div>

        <div className="bg-white p-5 rounded shadow border">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">User Tier Distribution</h2>
          <Doughnut
            data={{
              labels: Object.keys(stats.tierDistribution),
              datasets: [
                {
                  data: Object.values(stats.tierDistribution),
                  backgroundColor: ['#FBBF24', '#60A5FA', '#A78BFA'],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
  };
  return (
    <div className="bg-white shadow p-5 rounded-lg border">
      <p className="text-gray-500">{title}</p>
      <h2 className={`text-3xl font-bold ${colors[color]}`}>{value}</h2>
    </div>
  );
}
