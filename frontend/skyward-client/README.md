# Skyward Travels Booking Flow

This React + Vite project implements a dynamic trip booking flow featuring:

✨ Features
🖼️ Trip selection with animated image carousel

📅 Departure date selection

💳 Professional payment form (Visa/MasterCard/Credit) with validation

🎁 Loyalty points redemption toggle (100 points = $1 discount)

🔐 Input validation for all booking and payment fields

🪄 Smooth transitions and responsive UI with Tailwind CSS

📦 EventBus integration for microservice simulation

📈 Local storage stats tracking for analytics simulation
---

## Tech Stack

- **React** with functional components and hooks
- **Vite** for fast development with HMR
- **Tailwind CSS** for styling and responsive design
- **LocalStorage** for persisting booking & loyalty data
- Simple custom **eventBus** for communication between parts

---

## Features

### Trip Selection

- Auto-cycling trip images every 3 seconds
- Dropdown menu with trips and prices
- Next button to proceed to user detail input

### User Details & Payment

- Form inputs for name, email, departure date, card type, card number, expiry, CVV
- Real-time validation with error messages
- Loyalty points redemption toggle to apply discounts on booking
- Payment simulation with 90% success rate

### Loyalty Points System

- Earn loyalty points equal to the trip price on successful payment
- Redeem points to get discount (100 points = $1)
- Loyalty points stored and updated in browser localStorage

---

## Getting Started

### Prerequisites

- Node.js (v16 or above recommended)
- npm or yarn package manager

### Installation

```bash
git clone <repository-url>
cd skyward-travels-booking
npm install
npm run dev

## Screenshots

### Booking Flow Screenshot
<img src="./images/image1.png" />
<img src="./images/image2.png" />
<img src="./images/image3.png" />
<img src="./images/image4.png" />
<img src="./images/image5.png" />
<img src="./images/image6.png" />
<img src="./images/image7.png" />
<img src="./images/image8.png" />
<img src="./images/image9.png" />
