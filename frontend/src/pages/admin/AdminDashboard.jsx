import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/admin/services" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h2 className="text-xl font-bold mb-2">Manage Services</h2>
                    <p className="text-gray-600">Add, edit, or remove salon services.</p>
                </Link>

                <Link to="/admin/bookings" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h2 className="text-xl font-bold mb-2">Manage Bookings</h2>
                    <p className="text-gray-600">View all bookings and update statuses.</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
