// src/pages/Loyalty.jsx
import React, { useEffect, useState } from 'react';

export default function Loyalty() {
  const [loyaltyData, setLoyaltyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoyaltyData({
        totalPoints: 5000,
        redeemedPoints: 2500,
        tierProgress: 50,
        benefits: [
          'Priority customer support',
          '1.5x points on bookings',
          'Free seat selection',
        ],
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading loyalty data...
      </div>
    );
  }

  const available = loyaltyData.totalPoints - loyaltyData.redeemedPoints;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Loyalty Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Points Card */}
        <div className="bg-white shadow p-5 rounded-lg border">
          <p className="text-gray-500">Available Points</p>
          <h2 className="text-3xl font-bold text-blue-600">{available}</h2>
          <p className="text-sm text-gray-400 mt-2">Total: {loyaltyData.totalPoints} | Redeemed: {loyaltyData.redeemedPoints}</p>
        </div>

        {/* Value Card */}
        <div className="bg-white shadow p-5 rounded-lg border">
          <p className="text-gray-500">Points Value</p>
          <h2 className="text-3xl font-bold text-green-600">
            ${(available / 100).toFixed(2)}
          </h2>
          <p className="text-sm text-gray-400">100 points = $1.00</p>
        </div>

        {/* Tier Progress */}
        <div className="bg-white shadow p-5 rounded-lg border">
          <p className="text-gray-500 mb-2">Tier Progress</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mb-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${loyaltyData.tierProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {loyaltyData.tierProgress}% to next tier
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white shadow p-5 rounded-lg border mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Tier Benefits</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          {loyaltyData.benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
