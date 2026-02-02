import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserSidebar from '../components/UserSidebar';

const Settings = () => {
    const { user } = useSelector((state) => state.auth);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, dispatch an updateProfile action here
        alert("Profile update functionality would go here. (Backend integration required)");
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header */}
            <div className="bg-gray-900 text-white py-12 px-4 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-light mb-2">Settings</h1>
                    <div className="text-xs text-gray-400 flex gap-2">
                        <span>@7Customer</span>
                        <span>/</span>
                        <span className="text-gray-200">Settings</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <UserSidebar />

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">Account Settings</h2>
                        </div>

                        <div className="p-8">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                                    <img src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || 'User')} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <button className="text-sm text-rose-600 font-medium border border-rose-200 bg-rose-50 px-3 py-1.5 rounded hover:bg-rose-100 transition-colors">
                                        Change Avatar
                                    </button>
                                    <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rose-500 focus:border-rose-500 outline-none transition-all bg-gray-50 text-gray-500"
                                            disabled
                                            title="Email cannot be changed"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 mb-4">Change Password</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors shadow-sm"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
