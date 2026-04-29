import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sessionId) {
            setError('No session ID found.');
            setLoading(false);
            return;
        }

        // We can verify the session here or just trust the redirect (Stripe Webhook handles the actual logic)
        // For UX, we just show a success message.
        setLoading(false);
    }, [sessionId]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
    );

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl text-center shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-8">
                Your booking has been confirmed. You will receive an email confirmation shortly.
            </p>
            <div className="flex flex-col gap-3">
                <Link
                    to="/bookings"
                    className="bg-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors shadow-md"
                >
                    View My Bookings
                </Link>
                <Link
                    to="/"
                    className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
