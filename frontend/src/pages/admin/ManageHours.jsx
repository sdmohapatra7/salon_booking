import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const ManageHours = () => {
    const [hours, setHours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHours();
    }, []);

    const fetchHours = async () => {
        try {
            const response = await api.get('/working-hours');
            setHours(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            await api.put(`/working-hours/${id}`, data);
            fetchHours();
        } catch (err) {
            console.error(err);
            alert('Failed to update working hours');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading schedule...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-12">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Salon Schedule</h1>
                <p className="text-gray-500">Set your weekly opening and closing times. These changes reflect instantly on the booking calendar.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Day</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Open Time</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Close Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {hours.map((day) => (
                            <tr key={day.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-gray-800">{day.dayName}</td>
                                <td className="px-6 py-5">
                                    <button
                                        onClick={() => handleUpdate(day.id, { isClosed: !day.isClosed })}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                                            day.isClosed 
                                            ? 'bg-rose-100 text-rose-600' 
                                            : 'bg-green-100 text-green-600'
                                        }`}
                                    >
                                        {day.isClosed ? 'Closed' : 'Open'}
                                    </button>
                                </td>
                                <td className="px-6 py-5">
                                    <input 
                                        type="time" 
                                        value={day.openTime}
                                        disabled={day.isClosed}
                                        onChange={(e) => handleUpdate(day.id, { openTime: e.target.value })}
                                        className={`bg-white border border-gray-100 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all ${day.isClosed ? 'opacity-30' : 'opacity-100'}`}
                                    />
                                </td>
                                <td className="px-6 py-5">
                                    <input 
                                        type="time" 
                                        value={day.closeTime}
                                        disabled={day.isClosed}
                                        onChange={(e) => handleUpdate(day.id, { closeTime: e.target.value })}
                                        className={`bg-white border border-gray-100 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all ${day.isClosed ? 'opacity-30' : 'opacity-100'}`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-8 p-6 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-4">
                <div className="bg-rose-500 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h4 className="font-bold text-rose-900 mb-1">Schedule Sync</h4>
                    <p className="text-rose-700 text-sm leading-relaxed">Changes made here are applied instantly. Any dates marked as "Closed" will be greyed out in the customer's booking calendar, and time slots will be filtered to match your open/close hours.</p>
                </div>
            </div>
        </div>
    );
};

export default ManageHours;
