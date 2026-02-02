import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../store/bookingsSlice';
import { Link } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';

const UserDashboard = () => {
    const dispatch = useDispatch();
    const { items: bookings, status: bookingStatus } = useSelector((state) => state.bookings);
    // Favorites are loaded from local storage via initial state, no fetch needed
    const { items: favorites } = useSelector((state) => state.favorites || { items: [] });
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (bookingStatus === 'idle') {
            dispatch(fetchBookings());
        }
    }, [dispatch, bookingStatus]);

    // Stats
    const totalBookings = bookings.length;
    const upcomingBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    const activeFavorites = favorites ? favorites.length : 0;

    // Upcoming Appointment Card
    const nextAppointment = bookings
        .filter(b => b.status === 'Confirmed')
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Dashboard Header */}
            <div className="bg-gray-900 text-white py-12 px-4 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-light mb-2">Dashboard</h1>
                    <div className="text-xs text-gray-400 flex gap-2">
                        <span>@7Customer</span>
                        <span>/</span>
                        <span className="text-gray-200">Dashboard</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <UserSidebar />

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">

                        {/* Welcome Banner */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 👋</h2>
                                <p className="text-gray-500">Here is what’s happening with your account today.</p>
                            </div>
                            <Link to="/services" className="hidden md:inline-flex bg-rose-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors shadow-sm">
                                Book New Appointment
                            </Link>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Bookings</p>
                                        <h3 className="text-2xl font-bold text-gray-900">{totalBookings}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-500">Upcoming</p>
                                            <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Next</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">{upcomingBookings}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Favorites</p>
                                        <h3 className="text-2xl font-bold text-gray-900">{activeFavorites}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent / Upcoming Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Next Appointment */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Next Appointment</h3>
                                {nextAppointment ? (
                                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg">{nextAppointment.serviceName}</h4>
                                                <p className="text-sm text-gray-500">{nextAppointment.date} at {nextAppointment.time}</p>
                                            </div>
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">Confirmed</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link to="/bookings" className="flex-1 bg-white border border-gray-200 text-gray-700 text-center py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                        <p className="text-gray-500 mb-4">No upcoming appointments.</p>
                                        <Link to="/services" className="text-rose-600 font-medium hover:underline text-sm">Book one now &rarr;</Link>
                                    </div>
                                )}
                            </div>

                            {/* Recent Activity (Simplified List) */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Recent History</h3>
                                    <Link to="/bookings" className="text-sm text-rose-600 font-medium hover:underline">View All</Link>
                                </div>
                                <div className="space-y-4">
                                    {bookings.slice(0, 3).length > 0 ? bookings.slice(0, 3).map((b) => (
                                        <div key={b.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-default">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{b.serviceName}</p>
                                                    <p className="text-xs text-gray-500">{b.date}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded ${b.status === 'Completed' ? 'bg-blue-50 text-blue-600' :
                                                b.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                                                    'bg-green-50 text-green-600'
                                                }`}>
                                                {b.status}
                                            </span>
                                        </div>
                                    )) : (
                                        <p className="text-sm text-gray-500 text-center py-4">No booking history.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
