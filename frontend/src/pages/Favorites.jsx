import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import UserSidebar from '../components/UserSidebar';
import { fetchFavorites } from '../store/favoritesSlice'; // Import action

const Favorites = () => {
    const dispatch = useDispatch();
    const { items: favorites } = useSelector((state) => state.favorites);

    React.useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header */}
            <div className="bg-gray-900 text-white py-12 px-4 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-light mb-2">My Favorites</h1>
                    <div className="text-xs text-gray-400 flex gap-2">
                        <span>@7Customer</span>
                        <span>/</span>
                        <span className="text-gray-200">Favorites</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <UserSidebar />

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Your Favorites</h1>
                                <p className="mt-1 text-sm text-gray-500">Saved styles and services you love</p>
                            </div>
                            <Link to="/services" className="text-rose-600 hover:text-rose-700 font-medium text-sm">Browse more &rarr;</Link>
                        </div>

                        {favorites.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <div className="mx-auto h-16 w-16 text-gray-300 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No favorites yet</h3>
                                <p className="mt-1 text-sm text-gray-500">Heart items on the services page to save them here.</p>
                                <div className="mt-6">
                                    <Link to="/services" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                                        Explore Services
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favorites.map((service) => (
                                    <ServiceCard key={service.id} service={service} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorites;
