# ✂️ Salon Booking & Management System

A premium, full-stack salon management platform designed for luxury beauty businesses. Built with a modern tech stack, this system provides a seamless experience for both customers and administrators.

## 🚀 Live Demo
**Website / Frontend Live URL:** [https://salon-booking-silk-seven.vercel.app/](https://salon-booking-silk-seven.vercel.app/)

---

## 💎 Key Features

### 📅 Advanced Booking System
*   **Interactive Calendar**: Custom-built date picker with real-time availability.
*   **Dynamic Working Hours**: Automatically filters time slots based on salon opening/closing times.
*   **Stylist Selection**: Choose your favorite stylist from the team dropdown.
*   **Smart Availability**: Automatically greys out "Closed" days (e.g., Sundays or Holidays).

### 💳 Payments & Monetization
*   **Stripe Integration**: Secure checkout for services and one-time payments.
*   **Membership Subscriptions**: Tiered monthly plans (Silver, Gold, Platinum) with automatic recurring billing via Stripe Subscriptions.
*   **Digital Gift Cards**: Buy and send digital vouchers with unique redeemable codes.

### 📱 Communication & Engagement
*   **WhatsApp Notifications**: Automated booking confirmations and payment alerts sent directly to clients via Twilio.
*   **Loyalty Points**: Earn points on every booking and redeem them for discounts.
*   **Referral Program**: Invite friends and earn bonuses.

### 🎨 Visuals & Branding
*   **Lookbook Gallery**: A high-end masonry portfolio showcasing stylist transformations.
*   **Premium UI**: Glassmorphism effects, smooth transitions, and responsive design.

### 🛠️ Admin Power Tools
*   **Advanced Analytics**: Interactive charts (Recharts) for tracking Revenue, Top Stylists, and Peak Hours.
*   **Staff Management**: Full CRUD dashboard to manage the stylist team.
*   **Schedule Manager**: Visual interface to set weekly salon hours and status.
*   **Service Manager**: Dynamic pricing and category management.

---

## 🏗️ Technical Stack
*   **Frontend**: React + Vite, Redux Toolkit, Recharts, Tailwind CSS.
*   **Backend**: Node.js, Express.js.
*   **Database**: PostgreSQL with Sequelize ORM.
*   **APIs**: Stripe (Payments), Twilio (WhatsApp), Google OAuth (Auth).

---

## 🏃‍♂️ Running Locally

### 1. Prerequisites
*   Node.js installed.
*   PostgreSQL database (Neon.tech recommended).
*   Stripe & Twilio accounts for full feature testing.

### 2. Backend Setup
```bash
cd backend
npm install
# Update .env with your DB, Stripe, and Twilio credentials
npm run seed  # To populate dummy services, staff, and analytics data
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure
- `/frontend` - Modern React Vite client with Redux state management.
- `/backend` - Robust Node.js server with Stripe Webhook integration and Twilio service.
