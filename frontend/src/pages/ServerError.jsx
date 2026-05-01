import React from 'react';
import { Link } from 'react-router-dom';

const ServerError = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6">
            <div className="text-center max-w-xl animate-[fadeInUp_0.8s_ease-out]">
                <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-4">500 - System Glitch</h1>
                <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                    Our servers are currently having a bad hair day. Don't worry, our digital stylists 
                     are already on the case to get everything back in order.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-rose-600 text-white px-10 py-3 rounded-full font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
                    >
                        Try Again
                    </button>
                    <Link 
                        to="/" 
                        className="bg-white text-gray-900 border border-gray-200 px-10 py-3 rounded-full font-bold hover:bg-gray-50 transition-all"
                    >
                        Go Home
                    </Link>
                </div>
                <p className="mt-12 text-sm text-gray-400">
                    If the problem persists, please contact support at support@salonwala.com
                </p>
            </div>
        </div>
    );
};

export default ServerError;
