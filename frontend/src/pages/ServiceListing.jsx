import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/servicesSlice';
import ServiceCard from '../components/ServiceCard';

const ServiceListing = () => {
    const dispatch = useDispatch();
    const { items: services, status, error } = useSelector((state) => state.services);

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState(200);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [sortBy, setSortBy] = useState('Price Low to High');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchServices());
        }
    }, [status, dispatch]);

    // Dynamic Categories List
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(services.map(s => s.category))];
        return ['All Categories', ...uniqueCategories];
    }, [services]);

    // Filtering Logic
    const filteredServices = useMemo(() => {
        return services.filter(service => {
            // Search Text
            const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());

            // Price
            const matchesPrice = service.price <= priceRange;

            // Category
            let matchesCategory = true;
            if (selectedCategory !== 'All Categories') {
                matchesCategory = service.category === selectedCategory;
            }

            return matchesSearch && matchesPrice && matchesCategory;
        }).sort((a, b) => {
            if (sortBy === 'Price Low to High') return a.price - b.price;
            if (sortBy === 'Price High to Low') return b.price - a.price;
            if (sortBy === 'Newest') return b.id - a.id;
            return 0;
        });
    }, [services, searchTerm, priceRange, selectedCategory, sortBy]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-600"></div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="text-center text-red-600 py-10 bg-red-50 rounded-lg mx-4">
                <p>Error loading services: {error}</p>
                <button
                    onClick={() => dispatch(fetchServices())}
                    className="mt-4 text-rose-600 hover:text-rose-800 underline"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setPriceRange(200);
                                setSelectedCategory('All Categories');
                                setSortBy('Price Low to High');
                            }}
                            className="text-xs text-gray-500 hover:text-black"
                        >
                            Reset Filter
                        </button>
                    </div>

                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search By Keyword</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="e.g. Haircut..."
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500"
                        />
                    </div>

                    {/* Categories */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                        <div className="space-y-2">
                            {categories.map((cat, idx) => (
                                <div key={idx} className="flex items-center cursor-pointer" onClick={() => handleCategoryChange(cat)}>
                                    <div className={`h-4 w-4 rounded border flex items-center justify-center ${selectedCategory === cat ? 'bg-rose-600 border-rose-600' : 'border-gray-300'}`}>
                                        {selectedCategory === cat && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className={`ml-2 text-sm ${selectedCategory === cat ? 'text-rose-600 font-medium' : 'text-gray-600'}`}>{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Max Price</label>
                            <span className="text-xs font-semibold text-rose-600">${priceRange}</span>
                        </div>
                        <div className="px-1">
                            <input
                                type="range"
                                className="w-full accent-rose-500"
                                style={{ accentColor: '#db2777' }}
                                min="0"
                                max="200"
                                value={priceRange}
                                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>$0</span>
                                <span>$200</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-xl font-medium text-gray-900">Found <span className="text-rose-500 font-bold">{filteredServices.length} Services</span></h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-sm border-none bg-transparent font-medium focus:ring-0 cursor-pointer"
                            >
                                <option value="Price Low to High">Price Low to High</option>
                                <option value="Price High to Low">Price High to Low</option>
                                <option value="Newest">Newest</option>
                            </select>
                        </div>
                    </div>

                    {filteredServices.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-500">No services match your filters.</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setPriceRange(200);
                                    setSelectedCategory('All Categories');
                                }}
                                className="mt-2 text-rose-600 hover:underline text-sm"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredServices.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceListing;
