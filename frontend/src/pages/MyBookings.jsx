import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, cancelBooking } from '../store/bookingsSlice';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import UserSidebar from '../components/UserSidebar';

const MyBookings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: bookings } = useSelector((state) => state.bookings);
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingIDToCancel, setBookingIDToCancel] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, sortBy]);

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    const handleCancelClick = (id) => {
        setBookingIDToCancel(id);
        setIsModalOpen(true);
    };

    const confirmCancel = () => {
        if (bookingIDToCancel) {
            dispatch(cancelBooking(bookingIDToCancel));
            setBookingIDToCancel(null);
            setIsModalOpen(false);
        }
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
            });
        } catch (e) {
            return dateString;
        }
    };

    // Derived stats for the top bar
    const pendingCount = bookings.filter(b => b.status === 'Confirmed').length;
    const canceledCount = bookings.filter(b => b.status === 'Cancelled').length;
    const completedCount = bookings.filter(b => b.status === 'Completed').length;

    // Filter and Sort bookings
    const processedBookings = React.useMemo(() => {
        let result = bookings.filter(booking => {
            if (activeFilter === 'All') return true;
            if (activeFilter === 'Upcoming') return booking.status === 'Confirmed';
            if (activeFilter === 'Cancelled') return booking.status === 'Cancelled';
            if (activeFilter === 'Completed') return booking.status === 'Completed';
            return true;
        });

        return result.sort((a, b) => {
            if (sortBy === 'Newest') return new Date(b.date) - new Date(a.date);
            if (sortBy === 'Oldest') return new Date(a.date) - new Date(b.date);
            if (sortBy === 'Price High') return b.servicePrice - a.servicePrice;
            if (sortBy === 'Price Low') return a.servicePrice - b.servicePrice;
            return 0;
        });
    }, [bookings, activeFilter, sortBy]);

    // Pagination Calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = processedBookings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(processedBookings.length / itemsPerPage);

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Dashboard Header */}
            <div className="bg-gray-900 text-white py-12 px-4 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-light mb-2">My Bookings</h1>
                    <div className="text-xs text-gray-400 flex gap-2">
                        <span>@7Customer</span>
                        <span>/</span>
                        <span className="text-gray-200">Bookings</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <UserSidebar />

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        {/* Filters */}
                        <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
                            <div className="flex space-x-8 text-sm font-medium">
                                <button
                                    onClick={() => setActiveFilter('All')}
                                    className={`relative ${activeFilter === 'All' ? 'text-rose-600' : 'text-gray-500'}`}
                                >
                                    All ({bookings.length})
                                    {activeFilter === 'All' && <div className="absolute -bottom-6 left-0 right-0 h-1 bg-rose-600 rounded-t-full"></div>}
                                </button>
                                <button
                                    onClick={() => setActiveFilter('Upcoming')}
                                    className={`relative ${activeFilter === 'Upcoming' ? 'text-rose-600' : 'text-gray-500'}`}
                                >
                                    Upcoming ({pendingCount})
                                    {activeFilter === 'Upcoming' && <div className="absolute -bottom-6 left-0 right-0 h-1 bg-rose-600 rounded-t-full"></div>}
                                </button>
                                <button
                                    onClick={() => setActiveFilter('Cancelled')}
                                    className={`relative ${activeFilter === 'Cancelled' ? 'text-rose-600' : 'text-gray-500'}`}
                                >
                                    Cancelled ({canceledCount})
                                    {activeFilter === 'Cancelled' && <div className="absolute -bottom-6 left-0 right-0 h-1 bg-rose-600 rounded-t-full"></div>}
                                </button>
                                <button
                                    onClick={() => setActiveFilter('Completed')}
                                    className={`relative ${activeFilter === 'Completed' ? 'text-rose-600' : 'text-gray-500'}`}
                                >
                                    Completed ({completedCount})
                                    {activeFilter === 'Completed' && <div className="absolute -bottom-6 left-0 right-0 h-1 bg-rose-600 rounded-t-full"></div>}
                                </button>
                            </div>

                            <button
                                onClick={() => setSortBy(sortBy === 'Newest' ? 'Oldest' : 'Newest')}
                                className="text-sm text-gray-400 flex items-center gap-1 hover:text-black transition-colors"
                            >
                                Sort: Date {sortBy === 'Newest' ? 'Newest First' : 'Oldest First'}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 transition-transform ${sortBy === 'Oldest' ? 'rotate-180' : ''}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>

                        {/* Booking List */}
                        <div className="space-y-4">
                            {currentBookings.length === 0 ? (
                                <div className="text-center py-10 text-gray-500">No {activeFilter.toLowerCase()} bookings found.</div>
                            ) : currentBookings.map((booking) => (
                                <div key={booking.id} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{booking.serviceName}</h4>
                                            <span className="text-xs font-semibold bg-gray-100 px-2 py-0.5 rounded text-gray-600">Ref: #{booking.id}</span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        Booking Date {formatDate(booking.date)} • {booking.time}
                                    </div>

                                    <div className="font-medium text-gray-900 w-full md:text-right md:w-auto">
                                        Total <span className="font-bold">${booking.servicePrice}</span>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                                            booking.status === 'Completed' ? 'bg-blue-50 text-blue-600' :
                                                'bg-green-50 text-green-700'
                                            }`}>
                                            {booking.status}
                                        </span>

                                        {booking.status !== 'Completed' && (
                                            <button
                                                onClick={() => setSelectedBooking(booking)}
                                                className="text-sm font-medium text-rose-600 hover:text-rose-700"
                                            >
                                                Booking Details
                                            </button>
                                        )}

                                        {booking.status === 'Confirmed' && (
                                            <button
                                                onClick={() => handleCancelClick(booking.id)}
                                                className="text-xs text-red-400 hover:text-red-500"
                                                title="Cancel"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="w-8 h-8 rounded-full bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center text-sm font-medium"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page
                                            ? 'bg-rose-500 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="w-8 h-8 rounded-full bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center text-sm font-medium"
                                >
                                    &gt;
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cancel Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmCancel}
                title="Cancel Booking"
                message="Are you sure you want to cancel this booking? This action cannot be undone."
                confirmText="Yes, Cancel"
                cancelText="No, Keep It"
                isDanger={true}
            />

            {/* Details Modal */}
            <Modal
                isOpen={!!selectedBooking}
                onClose={() => setSelectedBooking(null)}
                title="Booking Details"
                cancelText="Close"
            >
                {selectedBooking && (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">{selectedBooking.serviceName}</h4>
                                    <p className="text-sm text-gray-500">Ref: #{selectedBooking.id}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${selectedBooking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                    selectedBooking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                    {selectedBooking.status}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <label className="block text-gray-500 mb-1">Date</label>
                                <p className="font-medium text-gray-900">{formatDate(selectedBooking.date)}</p>
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-1">Time</label>
                                <p className="font-medium text-gray-900">{selectedBooking.time}</p>
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-1">Price</label>
                                <p className="font-medium text-gray-900">${selectedBooking.servicePrice}</p>
                            </div>
                        </div>

                        {selectedBooking.status === 'Confirmed' && (
                            <div className="pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        const id = selectedBooking.id;
                                        setSelectedBooking(null);
                                        // Small timeout to allow modal to close smoothly before opening confirmation
                                        setTimeout(() => handleCancelClick(id), 100);
                                    }}
                                    className="w-full py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                                >
                                    Cancel this Booking
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MyBookings;
