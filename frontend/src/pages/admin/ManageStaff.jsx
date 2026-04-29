import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const ManageStaff = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        bio: '',
        image: ''
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await api.get('/staff');
            setStaff(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingStaff) {
                await api.put(`/staff/${editingStaff.id}`, formData);
            } else {
                await api.post('/staff', formData);
            }
            fetchStaff();
            handleClose();
        } catch (err) {
            console.error(err);
            alert('Failed to save staff member');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this staff member?')) {
            try {
                await api.delete(`/staff/${id}`);
                fetchStaff();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEdit = (member) => {
        setEditingStaff(member);
        setFormData({
            name: member.name,
            specialty: member.specialty,
            bio: member.bio,
            image: member.image
        });
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingStaff(null);
        setFormData({ name: '', specialty: '', bio: '', image: '' });
    };

    if (loading) return <div className="p-8">Loading Staff...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-gray-900">Manage Staff</h1>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-rose-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-100"
                >
                    + Add New Stylist
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member) => (
                    <div key={member.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={member.image} alt={member.name} className="w-16 h-16 rounded-2xl object-cover" />
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                                <p className="text-rose-500 text-sm font-medium">{member.specialty}</p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2">{member.bio}</p>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleEdit(member)}
                                className="flex-1 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-100"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(member.id)}
                                className="flex-1 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-100"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
                        <h2 className="text-2xl font-black text-gray-900 mb-6">{editingStaff ? 'Edit Stylist' : 'Add New Stylist'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Full Name</label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Specialty</label>
                                <input 
                                    type="text" 
                                    value={formData.specialty}
                                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                    placeholder="e.g. Master Stylist"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Bio</label>
                                <textarea 
                                    value={formData.bio}
                                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 h-24"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Image URL</label>
                                <input 
                                    type="text" 
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={handleClose} className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-100 hover:bg-rose-600">Save Stylist</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStaff;
