import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState({ name: '', description: '', price: '', duration: '', image: '' });

    // Auth header helper
    const getAuthHeader = () => {
        const token = JSON.parse(localStorage.getItem('salon_user'))?.token;
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchServices = async () => {
        try {
            const response = await api.get('/services');
            setServices(response.data);
        } catch (err) {
            console.error('Failed to fetch services');
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        try {
            await api.delete(`/services/${id}`, getAuthHeader());
            fetchServices();
        } catch (err) {
            alert('Failed to delete service');
        }
    };

    const handleEdit = (service) => {
        setIsEditing(true);
        setCurrentService(service);
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentService({ name: '', description: '', price: '', duration: '', image: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/services/${currentService.id}`, currentService, getAuthHeader());
            } else {
                await api.post('/services', currentService, getAuthHeader());
            }
            resetForm();
            fetchServices();
        } catch (err) {
            alert('Failed to save service');
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Manage Services</h1>

            {/* Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Service' : 'Add New Service'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text" placeholder="Service Name" required
                            className="border p-2 rounded w-full"
                            value={currentService.name}
                            onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                        />
                        <input
                            type="number" placeholder="Price ($)" required
                            className="border p-2 rounded w-full"
                            value={currentService.price}
                            onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
                        />
                        <input
                            type="number" placeholder="Duration (minutes)" required
                            className="border p-2 rounded w-full"
                            value={currentService.duration}
                            onChange={(e) => setCurrentService({ ...currentService, duration: e.target.value })}
                        />
                        <input
                            type="text" placeholder="Image URL (Optional)"
                            className="border p-2 rounded w-full"
                            value={currentService.image}
                            onChange={(e) => setCurrentService({ ...currentService, image: e.target.value })}
                        />
                    </div>
                    <textarea
                        placeholder="Description" required
                        className="border p-2 rounded w-full"
                        value={currentService.description}
                        onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                            {isEditing ? 'Update Service' : 'Add Service'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service.id} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{service.name}</h3>
                            <span className="text-teal-600 font-bold">${service.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(service)} className="text-blue-600 hover:underline">Edit</button>
                            <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:underline">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageServices;
