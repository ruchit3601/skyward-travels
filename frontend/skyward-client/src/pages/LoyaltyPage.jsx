import { useEffect, useState } from 'react';
import { getPoints } from '../services/loyaltyService';

export default function LoyaltyPage() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setPoints(getPoints());
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Loyalty Dashboard</h2>
      <div className="text-lg">🎉 You have <strong>{points}</strong> loyalty points.</div>
    </div>
  );
}
