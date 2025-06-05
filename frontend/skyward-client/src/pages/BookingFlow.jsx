import { useState, useEffect } from "react";
import { eventBus } from "@/utils/eventBus";

const tripImages = [
  { name: "Bali", value: "bali", price: 1000, src: "/images/bali.jpg" },
  { name: "Paris", value: "paris", price: 1800, src: "/images/paris.jpg" },
  { name: "New York City", value: "nyc", price: 1500, src: "/images/nyc.jpg" },
];

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [trip, setTrip] = useState("");
  const [redeemPoints, setRedeemPoints] = useState(false); // NEW toggle state
  const [loyaltyDiscount, setLoyaltyDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    date: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardType: "visa",
  });
  const [errors, setErrors] = useState({});
  const [currentImage, setCurrentImage] = useState(0);

  const selectedTrip = tripImages.find((t) => t.value === trip);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % tripImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedTrip) {
      const points = parseInt(localStorage.getItem("loyaltyPoints") || "0");
      const maxDiscount = Math.floor(points / 100);

      const discount = redeemPoints ? Math.min(maxDiscount, selectedTrip.price) : 0;
      setLoyaltyDiscount(discount);
      setFinalPrice(selectedTrip.price - discount);
    } else {
      setLoyaltyDiscount(0);
      setFinalPrice(0);
    }
  }, [trip, redeemPoints]);

  const validate = () => {
    const newErrors = {};
    if (!details.name.trim()) newErrors.name = "Name is required.";
    if (!details.email.includes("@")) newErrors.email = "Valid email required.";
    if (!details.date) newErrors.date = "Select a departure date.";
    if (!/^\d{16}$/.test(details.cardNumber)) newErrors.cardNumber = "Card number must be 16 digits.";
    if (!/^\d{2}\/\d{2}$/.test(details.expiry)) newErrors.expiry = "Use MM/YY format.";
    if (!/^\d{3,4}$/.test(details.cvv)) newErrors.cvv = "CVV must be 3 or 4 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!selectedTrip) return;
    if (!validate()) return;

    const price = selectedTrip.price;
    const points = parseInt(localStorage.getItem("loyaltyPoints") || "0");
    const maxDiscount = Math.floor(points / 100);
    const discount = redeemPoints ? Math.min(maxDiscount, price) : 0;
    const finalAmount = price - discount;
    const pointsUsed = discount * 100;

    eventBus.emit("booking.created", { trip, details });
    const paymentSuccess = Math.random() < 0.9;

    if (paymentSuccess) {
      const bookings = parseInt(localStorage.getItem("totalBookings") || "0");
      const payments = parseInt(localStorage.getItem("totalPayments") || "0");
      const newLoyalty = points - pointsUsed + finalAmount;

      localStorage.setItem("totalBookings", (bookings + 1).toString());
      localStorage.setItem("totalPayments", (payments + 1).toString());
      localStorage.setItem("loyaltyPoints", newLoyalty.toString());

      const dayIndex = new Date().getDay();
      const weeklyBookings = JSON.parse(localStorage.getItem('weeklyBookings') || JSON.stringify([0,0,0,0,0,0,0]));
      weeklyBookings[dayIndex] = (weeklyBookings[dayIndex] || 0) + 1;
      localStorage.setItem('weeklyBookings', JSON.stringify(weeklyBookings));

      const weeklyPayments = JSON.parse(localStorage.getItem('weeklyPayments') || JSON.stringify([0,0,0,0,0,0,0]));
      weeklyPayments[dayIndex] = (weeklyPayments[dayIndex] || 0) + 1;
      localStorage.setItem('weeklyPayments', JSON.stringify(weeklyPayments));

      eventBus.emit("payment.completed", {
        trip,
        user: details,
        amount: finalAmount,
      });

      eventBus.emit("loyalty.award", {
        email: details.email,
        points: finalAmount,
      });

      eventBus.emit("reporting.update");

      alert(`Booking confirmed! You earned ${finalAmount} new points after using ${pointsUsed} points.`);
      setStep(1);
      setTrip("");
      setRedeemPoints(false);
      setDetails({
        name: "",
        email: "",
        date: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardType: "visa",
      });
      setErrors({});
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-xl w-full">
      {step === 1 && (
        <div>
          <h2 className="text-xl text-black font-semibold mb-4">Select a Trip</h2>
          <div className="relative w-full h-60 rounded overflow-hidden shadow mb-4">
            <img
              src={tripImages[currentImage].src}
              alt={tripImages[currentImage].name}
              className="w-full h-full object-cover transition-all duration-1000"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
              {tripImages[currentImage].name}
            </div>
          </div>
          <select
            value={trip}
            onChange={(e) => setTrip(e.target.value)}
            className="w-full p-2 text-black border rounded"
          >
            <option value="">Choose a destination</option>
            {tripImages.map((t) => (
              <option key={t.value} value={t.value}>
                {t.name} — ${t.price}
              </option>
            ))}
          </select>
          <button
            onClick={() => trip && setStep(2)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl text-black font-semibold mb-4">Enter Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            className="w-full p-2 mb-2 text-black border rounded"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            className="w-full p-2 mb-2 text-black border rounded"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

          <input
            type="date"
            value={details.date}
            onChange={(e) => setDetails({ ...details, date: e.target.value })}
            className="w-full p-2 mb-2 text-black border rounded"
          />
          {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}

          {/* Toggle for loyalty redemption */}
          <div className="flex items-center mb-4 mt-2">
            <label htmlFor="redeemToggle" className="mr-3 text-black font-medium">
              Want to redeem your loyalty points?
            </label>
            <input
              type="checkbox"
              id="redeemToggle"
              checked={redeemPoints}
              onChange={() => setRedeemPoints(!redeemPoints)}
              className="w-5 h-5"
            />
          </div>

          <h3 className="text-md font-medium mb-2">
            Price: ${selectedTrip?.price} — Loyalty Discount: ${loyaltyDiscount} —{" "}
            <span className="text-green-600">Final Price: ${finalPrice}</span>
          </h3>

          <h2 className="text-lg text-black font-semibold mt-4 mb-2">Payment Details</h2>
          <select
            value={details.cardType}
            onChange={(e) => setDetails({ ...details, cardType: e.target.value })}
            className="w-full p-2 mb-2 text-black border rounded"
          >
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
            <option value="credit">Credit Card</option>
          </select>

          <input
            type="text"
            placeholder="Card Number"
            value={details.cardNumber}
            maxLength="16"
            onChange={(e) => setDetails({ ...details, cardNumber: e.target.value })}
            className="w-full p-2 mb-2 text-black border rounded"
          />
          {errors.cardNumber && <p className="text-red-600 text-sm">{errors.cardNumber}</p>}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="MM/YY"
              value={details.expiry}
              maxLength="5"
              onChange={(e) => setDetails({ ...details, expiry: e.target.value })}
              className="w-full p-2 mb-2 text-black border rounded"
            />
            <input
              type="text"
              placeholder="CVV"
              value={details.cvv}
              maxLength="4"
              onChange={(e) => setDetails({ ...details, cvv: e.target.value })}
              className="w-full p-2 mb-2 text-black border rounded"
            />
          </div>
          {errors.expiry && <p className="text-red-600 text-sm">{errors.expiry}</p>}
          {errors.cvv && <p className="text-red-600 text-sm">{errors.cvv}</p>}

          <button
            onClick={handlePayment}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Pay ${finalPrice} & Confirm
          </button>
        </div>
      )}
    </div>
  );
}
