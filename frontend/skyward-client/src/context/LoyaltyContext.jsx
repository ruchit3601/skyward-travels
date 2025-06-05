// src/context/LoyaltyContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { eventBus } from "../utils/eventBus"; // Make sure you have a simple event bus utility

const LoyaltyContext = createContext();

const tierThresholds = {
  Bronze: 0,
  Silver: 1000,
  Gold: 3000,
};

const tierMultipliers = {
  Bronze: 1,
  Silver: 1.5,
  Gold: 2,
};

export function LoyaltyProvider({ children }) {
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState("Bronze");

  useEffect(() => {
    if (points >= tierThresholds.Gold) setTier("Gold");
    else if (points >= tierThresholds.Silver) setTier("Silver");
    else setTier("Bronze");
  }, [points]);

  const addPoints = (pts) => {
    setPoints((prev) => prev + pts);
  };

  const redeemPoints = (pts) => {
    if (pts <= points) {
      setPoints(points - pts);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const handler = (data) => {
      // data.amount is amount paid
      const ptsEarned = Math.floor(data.amount * tierMultipliers[tier]);
      addPoints(ptsEarned);
    };
    eventBus.on("payment.completed", handler);
    return () => {
      eventBus.off("payment.completed", handler);
    };
  }, [tier]);

  return (
    <LoyaltyContext.Provider value={{ points, tier, addPoints, redeemPoints }}>
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error("useLoyalty must be used within LoyaltyProvider");
  }
  return context;
}
