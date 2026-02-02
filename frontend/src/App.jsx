import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
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

import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageBookings from './pages/admin/ManageBookings';




const Layout = () => {
  const location = useLocation();
  const hideLayout = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServiceListing />} />
          <Route path="/book/:serviceId" element={<BookingForm />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Admin Routes */}
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/services" element={<ManageServices />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
          </Route>
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
