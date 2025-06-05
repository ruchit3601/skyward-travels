import React, { useState } from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  CreditCardIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

const steps = [
  { id: 1, title: "Search Trips", icon: MagnifyingGlassIcon },
  { id: 2, title: "Booking Flow", icon: CalendarIcon },
  { id: 3, title: "Payment Confirmation", icon: CreditCardIcon },
  { id: 4, title: "Loyalty Points Earned", icon: StarIcon },
  { id: 5, title: "Reporting & Analytics", icon: ChartBarIcon },
];

export default function JourneyMap() {
  const [currentStep, setCurrentStep] = useState(3);

  const stepVisuals = {
    1: (
      <div className="flex justify-center space-x-6 mt-6 animate-fade-in-up text-blue-600">
        <MagnifyingGlassIcon className="w-10 h-10 animate-pulse" />
        <div>
          <p className="font-semibold text-lg">Search Filters</p>
          <p className="text-sm text-gray-600">Filter by dates, price, and destination.</p>
        </div>
      </div>
    ),
    2: (
      <div className="flex justify-center space-x-6 mt-6 animate-fade-in-up text-green-600">
        <CalendarIcon className="w-10 h-10 animate-bounce" />
        <div>
          <p className="font-semibold text-lg">Booking Form</p>
          <p className="text-sm text-gray-600">Choose a trip and enter your details.</p>
        </div>
      </div>
    ),
    3: (
      <div className="flex justify-center space-x-6 mt-6 animate-fade-in-up text-purple-600">
        <CreditCardIcon className="w-10 h-10 animate-pulse" />
        <div>
          <p className="font-semibold text-lg">Secure Payment</p>
          <p className="text-sm text-gray-600">Confirm bookings through secure checkout.</p>
        </div>
      </div>
    ),
    4: (
      <div className="flex justify-center space-x-6 mt-6 animate-fade-in-up text-yellow-500">
        <StarIcon className="w-10 h-10 animate-bounce" />
        <div>
          <p className="font-semibold text-lg">Earn Rewards</p>
          <p className="text-sm text-gray-600">Get points based on your bookings.</p>
        </div>
      </div>
    ),
    5: (
      <div className="flex justify-center space-x-6 mt-6 animate-fade-in-up text-indigo-600">
        <ChartBarIcon className="w-10 h-10 animate-pulse" />
        <div>
          <p className="font-semibold text-lg">Insights & Reports</p>
          <p className="text-sm text-gray-600">View behavior trends and performance charts.</p>
        </div>
      </div>
    ),
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Service Journey Map
      </h1>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between space-x-2 md:space-x-4 relative">
          <div className="absolute top-7 left-6 right-6 h-1 bg-gray-300 rounded z-0"></div>
          <div
            className="absolute top-7 left-6 h-1 bg-blue-600 rounded z-10 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative z-20 flex flex-col items-center cursor-pointer group"
                onClick={() => setCurrentStep(step.id)}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full
                    ${
                      isCompleted
                        ? "bg-green-500 shadow-lg"
                        : isActive
                        ? "bg-blue-600 shadow-lg"
                        : "bg-white border-2 border-gray-300 group-hover:border-blue-500"
                    }
                    transition-colors duration-300
                  `}
                >
                  {isCompleted ? (
                    <CheckCircleIcon className="w-8 h-8 text-white" />
                  ) : isActive ? (
                    <ClockIcon className="w-8 h-8 text-white animate-pulse" />
                  ) : (
                    <Icon
                      className={`w-7 h-7 ${
                        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"
                      }`}
                    />
                  )}
                </div>

                <p
                  className={`mt-3 max-w-[100px] text-center text-sm font-semibold
                    ${
                      isCompleted
                        ? "text-green-700"
                        : isActive
                        ? "text-blue-700"
                        : "text-gray-500 group-hover:text-blue-600"
                    }
                    transition-colors duration-300
                  `}
                >
                  {step.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Description Box */}
        <div className="mt-16 max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {steps.find((s) => s.id === currentStep)?.title}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {currentStep === 1 &&
              "Users search for trips, filtering by dates, destination, and price to find their perfect vacation."}
            {currentStep === 2 &&
              "Users select their desired trips and enter personal details to proceed with booking."}
            {currentStep === 3 &&
              "Users complete payment securely, confirming their booking and triggering loyalty rewards."}
            {currentStep === 4 &&
              "Loyalty points are awarded based on bookings, helping users unlock rewards and benefits."}
            {currentStep === 5 &&
              "Comprehensive reporting and analytics provide insights into user behavior and business performance."}
          </p>

          {/* Step-specific visual */}
          {stepVisuals[currentStep]}
        </div>
      </div>
    </div>
  );
}
