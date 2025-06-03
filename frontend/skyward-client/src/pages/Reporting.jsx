// src/pages/Reporting.jsx
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Reporting() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setStats({
        bookings: 128,
        payments: 124,
        loyaltyPoints: 9820,
        chartData: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          bookings: [12, 19, 10, 22, 15, 30, 20],
          payments: [10, 17, 8, 19, 12, 28, 18],
        },
        tierDistribution: {
          Gold: 15,
          Silver: 45,
          Bronze: 40,
        },
      });
      setLoading(false);
    }, 1500);
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
