import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

const COLORS = ['#F43F5E', '#FB7185', '#FDA4AF', '#FECDD3', '#FFF1F2'];

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/analytics/summary');
                setData(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500">Generating analytics...</div>;

    const statusData = data.statusCounts.map(item => ({
        name: item.status,
        value: parseInt(item.count)
    }));

    const stylistData = data.topStylists.map(item => ({
        name: item.Staff.name,
        count: parseInt(item.bookingCount)
    }));

    const hourData = data.peakHours.map(item => ({
        time: item.time,
        count: parseInt(item.count)
    }));

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Performance Analytics</h1>
                <p className="text-gray-500">Track your salon's growth, peak hours, and top-performing stylists.</p>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Revenue</h4>
                    <p className="text-4xl font-black text-gray-900">${data.totalRevenue.toFixed(2)}</p>
                    <span className="text-green-500 text-xs font-bold mt-2 inline-block">↑ 12% from last month</span>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Bookings</h4>
                    <p className="text-4xl font-black text-gray-900">
                        {statusData.reduce((acc, curr) => acc + curr.value, 0)}
                    </p>
                    <span className="text-rose-500 text-xs font-bold mt-2 inline-block">7 pending review</span>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Avg. Ticket Size</h4>
                    <p className="text-4xl font-black text-gray-900">
                        ${(data.totalRevenue / (statusData.find(s => s.name === 'Completed')?.value || 1)).toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bookings by Status */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-8">Booking Status Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Stylists */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-8">Top Stylists by Appointments</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stylistData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{fill: '#FFF1F2'}} />
                                <Bar dataKey="count" fill="#F43F5E" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Peak Hours */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-8">Peak Booking Hours</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={hourData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="count" stroke="#F43F5E" fillOpacity={1} fill="url(#colorCount)" strokeWidth={4} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
