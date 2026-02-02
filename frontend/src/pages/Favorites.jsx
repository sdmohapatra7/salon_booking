import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

const Favorites = () => {
    const { items: favorites } = useSelector((state) => state.favorites);

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Your Favorites</h1>
                        <p className="mt-2 text-gray-600">Saved styles and services you love</p>
                    </div>
                    <Link to="/services" className="text-rose-600 hover:text-rose-700 font-medium text-sm">Browse more services &rarr;</Link>
                </div>

                {favorites.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="mx-auto h-24 w-24 text-gray-200 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <h3 className="mt-2 text-xl font-medium text-gray-900">No favorites yet</h3>
                        <p className="mt-1 text-gray-500">Heart items on the services page to save them here.</p>
                        <div className="mt-6">
                            <Link to="/services" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                                Explore Services
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
