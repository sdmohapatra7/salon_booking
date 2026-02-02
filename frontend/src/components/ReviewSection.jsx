import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import StarRating from './StarRating';

const ReviewSection = ({ serviceId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('salon_user'));

    const fetchReviews = async () => {
        try {
            const res = await api.get(`/reviews/service/${serviceId}`);
            setReviews(res.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [serviceId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (rating === 0) {
            setError('Please select a star rating.');
            return;
        }

        setLoading(true);
        try {
            const token = user?.token;
            await api.post('/reviews', {
                serviceId,
                rating,
                comment
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setComment('');
            setRating(0);
            fetchReviews(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Reviews</h3>

            {/* Review List */}
            <div className="space-y-4 mb-8">
                {reviews.length === 0 ? (
                    <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
                ) : (
                    reviews.map((op) => (
                        <div key={op.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold flex items-center">
                                    <span className="w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center mr-2 text-sm">
                                        {op.User?.name?.charAt(0) || 'U'}
                                    </span>
                                    {op.User?.name || 'Anonymous'}
                                </span>
                                <StarRating rating={op.rating} readOnly />
                            </div>
                            <p className="text-gray-700">{op.comment}</p>
                            <span className="text-xs text-gray-400 mt-2 block">
                                {new Date(op.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                )}
            </div>

            {/* Add Review Form */}
            {user ? (
                <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-bold mb-2">Leave a Review</h4>
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-600 mb-1">Rating</label>
                            <StarRating rating={rating} setRating={setRating} />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-600 mb-1">Comment</label>
                            <textarea
                                className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500"
                                rows="3"
                                placeholder="Share your experience..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:bg-gray-400"
                        >
                            {loading ? 'Submitting...' : 'Post Review'}
                        </button>
                    </form>
                </div>
            ) : (
                <p className="text-gray-600">Please <a href="/login" className="text-teal-600 underline">login</a> to leave a review.</p>
            )}
        </div>
    );
};

export default ReviewSection;
