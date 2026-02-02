import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';
import ReviewSection from './ReviewSection';

const ServiceCard = ({ service }) => {
    const dispatch = useDispatch();
    const { items: favorites } = useSelector((state) => state.favorites);
    const [showReviews, setShowReviews] = useState(false);

    const isFavorite = useMemo(() => {
        return favorites.some(item => item.id === service.id);
    }, [favorites, service.id]);

    const handleFavorite = (e) => {
        e.preventDefault();
        if (isFavorite) {
            dispatch(removeFromFavorites(service.id));
        } else {
            dispatch(addToFavorites(service));
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col group h-auto">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={service.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"}
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
                            {service.duration} mins • NYC
                        </p>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50/50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 line-through">${Math.round(service.price * 1.2)}</span>
                            <span className="text-lg font-bold text-gray-900">${service.price}</span>
                        </div>
                        <Link
                            to={`/book/${service.id}`}
                            className="bg-black text-white hover:bg-gray-800 font-medium py-2 px-6 rounded-lg text-sm transition-colors"
                        >
                            Book
                        </Link>
                    </div>

                    <button
                        onClick={() => setShowReviews(!showReviews)}
                        className="w-full text-center text-teal-600 text-sm hover:underline border-t border-gray-100 pt-2"
                    >
                        {showReviews ? 'Hide Reviews ▲' : 'Read Reviews ▼'}
                    </button>

                    {showReviews && <ReviewSection serviceId={service.id} />}
                </div>
            </div>
        </div>
    );
};
export default ServiceCard;
