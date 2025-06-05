// src/components/LoyaltyDashboard.jsx
import React, { useState } from "react";
import { useLoyalty } from "../context/LoyaltyContext";

export default function LoyaltyDashboard() {
  const { points, tier, redeemPoints } = useLoyalty();
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [message, setMessage] = useState("");

  const handleRedeem = () => {
    if (redeemPoints(redeemAmount)) {
      setMessage(`Redeemed ${redeemAmount} points successfully!`);
    } else {
      setMessage("Not enough points to redeem.");
    }
    setRedeemAmount(0);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-md w-full">
      <h2 className="text-2xl font-semibold mb-4">Loyalty Dashboard</h2>
      <p>Current Tier: <strong>{tier}</strong></p>
      <p>Total Points: <strong>{points}</strong></p>

      <div className="mt-4">
        <label>
          Redeem Points:
          <input
            type="number"
            min="0"
            value={redeemAmount}
            onChange={(e) => setRedeemAmount(Number(e.target.value))}
            className="ml-2 p-1 border rounded w-24"
          />
        </label>
        <button
          onClick={handleRedeem}
          className="ml-2 px-3 py-1 bg-red-600 text-white rounded"
          disabled={redeemAmount <= 0}
        >
          Redeem
        </button>
      </div>
      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
    </div>
  );
}
