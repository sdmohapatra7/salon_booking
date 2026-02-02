import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            // Updated to fetch ALL bookings via the new admin route
            const token = JSON.parse(localStorage.getItem('salon_user'))?.token;
            // Ideally use an interceptor, but for now explicitly adding header if not set
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            const response = await api.get('/bookings/all', config);
            setBookings(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch bookings', err);
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const token = JSON.parse(localStorage.getItem('salon_user'))?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            await api.put(`/bookings/${id}/status`, { status }, config);
            fetchBookings(); // Refresh
        } catch (err) {
            console.error('Failed to update status', err);
            alert('Failed to update status');
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Customer</th>
                            <th className="py-2 px-4 border-b">Service</th>
                            <th className="py-2 px-4 border-b">Date/Time</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="text-center">
                                <td className="py-2 px-4 border-b">{booking.id}</td>
                                <td className="py-2 px-4 border-b">{booking.customerName}</td>
                                <td className="py-2 px-4 border-b">{booking.serviceName}</td>
                                <td className="py-2 px-4 border-b">{booking.date} at {booking.time}</td>
                                <td className="py-2 px-4 border-b text-sm font-semibold">
                                    <span className={`px-2 py-1 rounded ${
                                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                        booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <select 
                                        value={booking.status}
                                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                                        className="border rounded p-1"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
