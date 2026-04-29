import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const Portfolio = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Hair', 'Nails', 'Facial', 'Makeup', 'Massage'];

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await api.get('/portfolio');
                setItems(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPortfolio();
    }, []);

    const filteredItems = filter === 'All' ? items : items.filter(item => item.category === filter);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-black text-gray-900 mb-6">Our Work Gallery</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Explore the transformation and artistry created by our expert stylists. From classic cuts to avant-garde nail art.
                </p>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${
                            filter === cat 
                            ? 'bg-rose-500 text-white shadow-lg' 
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-rose-300'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredItems.map((item) => (
                    <div key={item.id} className="break-inside-avoid relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                        <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-2">{item.category}</span>
                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-200 text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                    <p className="text-gray-500">No work found in this category yet. Check back soon!</p>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
