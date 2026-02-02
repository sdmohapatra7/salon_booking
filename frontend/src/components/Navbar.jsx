import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <div className="border border-black px-3 py-1 bg-white">
                    <span className="font-serif tracking-widest font-bold text-black text-sm md:text-base whitespace-nowrap">
                        HAIR RAP BY YOYO
                    </span>
                    <div className="text-[0.5rem] tracking-[0.2em] text-center uppercase text-gray-500">
                        Salon
                    </div>
                </div>
            </Link>

            {/* Middle Links */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <Link to="/services" className="hover:text-black transition-colors">Services</Link>
                {isAuthenticated && (
                    <>
                        <Link to="/bookings" className="hover:text-black transition-colors">My Bookings</Link>
                        <Link to="/favorites" className="hover:text-black transition-colors">Favorites</Link>
                    </>
                )}
                <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
                {isAuthenticated && user?.role === 'admin' && (
                    <Link to="/admin" className="text-teal-600 font-bold hover:text-teal-800 transition-colors">Admin Dashboard</Link>
                )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
                {isAuthenticated && user ? (
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end text-right">
                            <span className="text-sm font-bold text-gray-900 leading-none">{user.name}</span>
                            <span className="text-xs text-gray-500">Member</span>
                        </div>
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full border border-gray-200 bg-gray-100"
                        />
                        <button
                            onClick={handleLogout}
                            className="text-xs text-red-500 hover:text-red-700 font-medium ml-2 border border-red-100 px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="flex items-center text-gray-500 hover:text-black text-sm font-medium gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
