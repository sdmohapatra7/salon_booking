import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserSidebar from '../components/UserSidebar';

import api from '../api/axiosConfig';

const Settings = () => {
    const { user } = useSelector((state) => state.auth);
    // Profile State
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 2FA State
    const [is2FAEnabled, setIs2FAEnabled] = useState(user?.isTwoFactorEnabled || false);
    const [qrCode, setQrCode] = useState(null);
    const [setupStep, setSetupStep] = useState('idle'); // idle, qr, verifying
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Profile update functionality would go here. (Backend integration required for Profile Update)");
    };

    const handleEnable2FA = async () => {
        try {
            const res = await api.post('/2fa/generate');
            setQrCode(res.data.qrCode);
            setSetupStep('qr');
            setMessage('');
        } catch (err) {
            setMessage('Error generating QR Code');
        }
    };

    const handleVerify2FA = async () => {
        try {
            await api.post('/2fa/verify', { token });
            setIs2FAEnabled(true);
            setSetupStep('idle');
            setQrCode(null);
            setToken('');
            setMessage('Two-Factor Authentication Enabled Successfully!');
        } catch (err) {
            setMessage('Invalid Token, please try again.');
        }
    };

    const handleDisable2FA = async () => {
        if (window.confirm("Are you sure you want to disable 2FA? Your account will be less secure.")) {
            try {
                await api.post('/2fa/disable');
                setIs2FAEnabled(false);
                setMessage('Two-Factor Authentication Disabled.');
            } catch (err) {
                setMessage('Error disabling 2FA');
            }
        }
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
                    <div className="flex-1 space-y-6">
                        {/* Profile Settings */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-left">
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

                        {/* 2FA Settings */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-left">
                            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h2>
                                {is2FAEnabled && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">ENABLED</span>}
                            </div>
                            <div className="p-8">
                                <p className="text-sm text-gray-600 mb-6">
                                    Add an extra layer of security to your account by enabling Two-Factor Authentication (2FA).
                                    We support Google Authenticator, Authy, and other TOTP apps.
                                </p>

                                {message && (
                                    <div className={`mb-6 px-4 py-3 rounded text-sm ${message.includes('Success') || message.includes('Disabled') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        {message}
                                    </div>
                                )}

                                {!is2FAEnabled ? (
                                    <>
                                        {setupStep === 'idle' && (
                                            <button
                                                onClick={handleEnable2FA}
                                                className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors"
                                            >
                                                Enable 2FA
                                            </button>
                                        )}

                                        {setupStep === 'qr' && (
                                            <div className="space-y-6">
                                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 inline-block">
                                                    <p className="font-bold text-sm mb-4">1. Scan this QR Code</p>
                                                    <img src={qrCode} alt="2FA QR Code" className="w-48 h-48 mx-auto border border-gray-300 rounded" />
                                                </div>

                                                <div>
                                                    <p className="font-bold text-sm mb-2">2. Enter the 6-digit code</p>
                                                    <div className="flex gap-4 items-center">
                                                        <input
                                                            type="text"
                                                            value={token}
                                                            onChange={(e) => setToken(e.target.value)}
                                                            placeholder="000000"
                                                            maxLength="6"
                                                            className="w-32 px-4 py-2 border border-gray-300 rounded-lg text-center tracking-widest font-mono"
                                                        />
                                                        <button
                                                            onClick={handleVerify2FA}
                                                            className="px-6 py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors"
                                                        >
                                                            Verify & Enable
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div>
                                        <button
                                            onClick={handleDisable2FA}
                                            className="px-6 py-2 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
                                        >
                                            Disable 2FA
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
