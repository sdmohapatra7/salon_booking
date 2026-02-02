import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const UserSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg> },
        { path: '/bookings', label: 'Bookings', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg> },
        { path: '/favorites', label: 'Favorites', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg> },
        { path: '/settings', label: 'Settings', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 1.26-1.06 2.443-2.049 3.191l-.106.075c-1.371.95-3.791.93-5.075-.386-1.396-1.433-3.218 1.486-1.486 3.218 1.316 1.284 1.336 3.704.386 5.075l-.075.106C14.443 22.94 13.26 24 12 24c-1.26 0-2.443-1.06-3.191-2.049l-.075-.106c-.95-1.371-.93-3.791.386-5.075 1.433-1.396-1.486-3.218-3.218-1.486-1.284-1.316-3.704-1.336-5.075-.386l.106.075C1.06 14.443 0 13.26 0 12c0-1.26 1.06-2.443 2.049-3.191l.106-.075c1.371-.95 3.791-.93 5.075.386 1.396 1.433 3.218-1.486 1.486-3.218-1.316-1.284-1.316-3.704-.386-5.075l.075-.106C9.557 1.06 10.74 0 12 0c1.26 0 2.443 1.06 3.191 2.049l.075.106c.95 1.371.93 3.791-.386 5.075-1.433 1.396 1.486 3.218 3.218 1.486 1.284-1.316 3.704-1.336 5.075-.386l.106.075C22.94 9.557 24 10.74 24 12Z" /></svg> },
    ];

    return (
        <div className="w-full lg:w-64 flex-shrink-0">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 overflow-hidden">
                    <img src={user?.avatar || "https://ui-avatars.com/api/?name=Guest+User&background=random"} alt="User" />
                </div>
                <h3 className="font-bold text-gray-900">{user?.name || 'Guest User'}</h3>
                <p className="text-xs text-gray-500 mt-1">Member Since {user ? 'Sep 2021' : 'Today'}</p>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <nav className="flex flex-col text-sm text-gray-600">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`px-6 py-4 flex items-center gap-3 transition-colors ${isActive(item.path)
                                    ? 'bg-rose-50 text-rose-600 border-l-4 border-rose-500 font-medium'
                                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}

                    <button onClick={handleLogout} className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-3 text-red-500 border-l-4 border-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" /></svg>
                        Logout
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default UserSidebar;
