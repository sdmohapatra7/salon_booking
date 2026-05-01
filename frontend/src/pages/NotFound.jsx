import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
            <div className="text-center max-w-lg animate-[fadeIn_0.8s_ease-out]">
                <h1 className="text-[12rem] font-black text-rose-500/10 leading-none select-none">404</h1>
                <div className="-mt-20 relative">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Lost in Style?</h2>
                    <p className="text-gray-600 mb-10 text-lg">
                        Oops! The page you're looking for seems to have gone for a makeover. 
                        It's either moved, deleted, or never existed in the first place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/" 
                            className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-600 transition-all shadow-lg hover:shadow-rose-200"
                        >
                            Back to Home
                        </Link>
                        <Link 
                            to="/services" 
                            className="border border-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-all"
                        >
                            Browse Services
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
