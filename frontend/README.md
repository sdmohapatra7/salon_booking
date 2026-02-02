# Salon Booking Application

A premium, user-friendly frontend for a salon booking system built with **React**, **Redux Toolkit**, and **Tailwind CSS**.

## Features

- **Service Listing**: Browse premium salon services with details and pricing.
- **Booking System**: 
    - Smooth booking flow with pre-filled service details.
    - **Form Validation** using **Formik** and **Yup**.
    - Flexible service selection (Dropdown or Direct Book).
- **My Bookings**: 
    - View all upcoming and cancelled appointments.
    - **Tabs** for filtering (All, Upcoming, Cancelled).
    - **Cancel Booking** capability.
- **Responsive Design**: Fully responsive UI tailored for mobile and desktop.

## Tech Stack & Approach

### Core Technologies
- **React (Vite)**: For a fast, modern component-based UI.
- **Tailwind CSS v4**: For rapid, utility-first styling with a premium design system (custom color palette, glassmorphism effects).
- **Redux Toolkit**: Centralized state management for Services and Bookings, enabling predictable data flow.
- **Formik & Yup**: robust form handling and validation logic.
- **Axios & Axios Mock Adapter**: simulating a real REST API with network latency to demonstrate realistic async handling.

### Architecture
- **State Management**: Uses Redux slices (`servicesSlice`, `bookingsSlice`) to manage application state, employing `createAsyncThunk` for async operations.
- **Mock API**: A realistic mock backend (`src/api/mockData.js`) intercepts Axios requests, allowing the app to function fully without a real server.
- **Component Design**: Reusable components (`ServiceCard`, `Navbar`) and page-level components (`BookingForm`, `MyBookings`) focused on single responsibilities.

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view the app.

3.  **Build for Production**
    ```bash
    npm run build
    ```
