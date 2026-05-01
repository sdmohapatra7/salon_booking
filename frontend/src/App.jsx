import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import { fetchFavorites } from './store/favoritesSlice';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ServiceListing from './pages/ServiceListing';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import UserDashboard from './pages/UserDashboard';
import GenericPage from './pages/GenericPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancelled from './pages/PaymentCancelled';
import Membership from './pages/Membership';
import Portfolio from './pages/Portfolio';
import GiftCards from './pages/GiftCards';
import Analytics from './pages/Admin/Analytics';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';

import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageHours from './pages/Admin/ManageHours';
import ManageStaff from './pages/Admin/ManageStaff';
import ManageServices from './pages/Admin/ManageServices';
import ManageBookings from './pages/admin/ManageBookings';

const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const hideLayout = ['/login', '/register', '/404', '/500'].includes(location.pathname);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites());
    }
  }, [user, dispatch]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServiceListing />} />
          <Route path="/book/:serviceId" element={<BookingForm />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Static Pages */}
          <Route path="/about" element={<GenericPage type="about" />} />
          <Route path="/careers" element={<GenericPage type="careers" />} />
          <Route path="/faq" element={<GenericPage type="faq" />} />
          <Route path="/privacy" element={<GenericPage type="privacy" />} />
          <Route path="/terms" element={<GenericPage type="terms" />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/gift-cards" element={<GiftCards />} />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<ManageServices />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/staff" element={<ManageStaff />} />
            <Route path="/admin/hours" element={<ManageHours />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Route>

          {/* Error Pages */}
          <Route path="/500" element={<ServerError />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
      <Chatbot />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
}

export default App;
