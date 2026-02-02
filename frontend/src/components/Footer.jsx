import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 text-sm text-gray-500 font-light">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-5 gap-8">
                {/* Columns */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
                    <ul className="space-y-3">
                        <li><Link to="#" className="hover:text-rose-500">Features</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Pricing</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Case studies</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Reviews</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Updates</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                    <ul className="space-y-3">
                        <li><Link to="#" className="hover:text-rose-500">Getting started</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Help center</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Server status</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Report a bug</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Chat support</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">For Provider</h3>
                    <ul className="space-y-3">
                        <li><Link to="#" className="hover:text-rose-500">About</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Contact us</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Careers</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Faq s</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                    <ul className="space-y-3">
                        <li><Link to="#" className="hover:text-rose-500">Getting started</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Help center</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Other Products</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Report a bug</Link></li>
                        <li><Link to="#" className="hover:text-rose-500">Chat support</Link></li>
                    </ul>
                </div>

                {/* Subscription */}
                <div className="col-span-2 md:col-span-1">
                    <h3 className="font-semibold text-gray-900 mb-4">SignUp For Subscription</h3>
                    <div className="space-y-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500"
                        />
                        <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-md font-medium transition-colors">
                            Subscribe
                        </button>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-8 cursor-pointer" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-8 cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="flex gap-3">
                        {/* Social Icons Placeholder */}
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">f</div>
                        <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center text-xs">I</div>
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">t</div>
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">w</div>
                        <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">y</div>
                        <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs">in</div>
                    </div>
                </div>

                <div className="text-gray-400 text-xs text-center md:text-right">
                    <p className="mb-2">Copyright © 2025 - All Rights Reserved SalonWala</p>
                    <div className="flex gap-4 justify-center md:justify-end">
                        <Link to="#" className="hover:text-gray-600">Terms and Conditions</Link>
                        <span>|</span>
                        <Link to="#" className="hover:text-gray-600">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
