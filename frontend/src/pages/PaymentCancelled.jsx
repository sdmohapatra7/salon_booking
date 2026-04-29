import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancelled = () => {
    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl text-center shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Cancelled</h2>
            <p className="text-gray-600 mb-8">
                Your payment process was cancelled. No charges were made, and your booking remains pending.
            </p>
            <div className="flex flex-col gap-3">
                <Link
                    to="/book"
                    className="bg-rose-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-rose-600 transition-colors shadow-md"
                >
                    Try Booking Again
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

export default PaymentCancelled;
