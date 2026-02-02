import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';

const ServiceCard = ({ service }) => {
    const dispatch = useDispatch();
    const { items: favorites } = useSelector((state) => state.favorites);

    const isFavorite = useMemo(() => {
        return favorites.some(item => item.id === service.id);
    }, [favorites, service.id]);

    const handleFavorite = (e) => {
        e.preventDefault(); // Prevent navigating if wrapped in Link
        if (isFavorite) {
            dispatch(removeFromFavorites(service.id));
        } else {
            dispatch(addToFavorites(service));
        }
    };
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col group">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                    onClick={handleFavorite}
                    className={`absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full transition-colors backdrop-blur-sm ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-semibold text-gray-700">
                    {service.category || 'Hair'}
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{service.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-400">
                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                            New Jersey, USA
                        </p>
                    </div>
                    <div className="flex items-center bg-green-50 px-1.5 py-0.5 rounded text-xs font-bold text-green-700 gap-0.5">
                        <span>4.8</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50/50">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">${Math.round(service.price * 1.2)}</span>
                        <span className="text-lg font-bold text-gray-900">${service.price}</span>
                    </div>

                    <Link
                        to={`/book/${service.id}`}
                        className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-medium py-2 px-4 rounded-lg text-sm transition-colors duration-300"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
