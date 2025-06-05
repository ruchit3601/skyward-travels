// src/pages/Loyalty.jsx
import React, { useEffect, useState } from 'react';
import { eventBus } from '@/utils/eventBus';

export default function Loyalty() {
  const [totalPoints, setTotalPoints] = useState(0);
  const [redeemedPoints, setRedeemedPoints] = useState(0);
  const [tierProgress, setTierProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on first mount
  useEffect(() => {
    const points = parseInt(localStorage.getItem("loyaltyPoints") || "0");
    setTotalPoints(points);
    setRedeemedPoints(0);
    setTierProgress(Math.min((points / 10000) * 100, 100)); // Adjust as needed
    setLoading(false);
  }, []);

  // Update on loyalty.award event
  useEffect(() => {
    const handleLoyaltyAward = ({ email, points }) => {
      setTotalPoints((prev) => {
        const newTotal = prev + points;
        localStorage.setItem("loyaltyPoints", newTotal.toString());
        setTierProgress(Math.min((newTotal / 10000) * 100, 100));
        return newTotal;
      });
    };

    eventBus.on("loyalty.award", handleLoyaltyAward);
    return () => eventBus.off("loyalty.award", handleLoyaltyAward);
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading loyalty data...</div>;
  }

  const available = totalPoints - redeemedPoints;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Loyalty Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Points Card */}
        <div className="bg-white shadow p-5 rounded-lg border">
          <p className="text-gray-500">Available Points</p>
          <h2 className="text-3xl font-bold text-blue-600">{available}</h2>
          <p className="text-sm text-gray-400 mt-2">
            Total: {totalPoints} | Redeemed: {redeemedPoints}
          </p>
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
              style={{ width: `${tierProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {tierProgress.toFixed(1)}% to next tier
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white shadow p-5 rounded-lg border mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Tier Benefits</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Priority customer support</li>
          <li>1.5x points on bookings</li>
          <li>Free seat selection</li>
        </ul>
      </div>
    </div>
  );
}
