import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-rose-50 border-t border-rose-100 pt-16 pb-8 text-sm text-gray-600 font-light">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand Column */}
                <div className="space-y-4">
                    <h2 className="text-2xl text-gray-900 font-light tracking-wider">SALON<span className="font-bold text-rose-600">WALA</span></h2>
                    <p className="text-gray-600 leading-relaxed max-w-xs">
                        Experience world-class hair and beauty services. We bring the luxury salon experience directly to you.
                    </p>
                    <div className="flex gap-4 pt-2">
                        {/* Social Icons */}
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-rose-100 flex items-center justify-center hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all text-rose-600 shadow-sm">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-rose-100 flex items-center justify-center hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all text-rose-600 shadow-sm">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-rose-100 flex items-center justify-center hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all text-rose-600 shadow-sm">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-gray-900 tracking-wide uppercase text-xs mb-6">Company</h3>
                    <ul className="space-y-3">
                        <li><Link to="/about" className="hover:text-rose-600 transition-colors">About Us</Link></li>
                        <li><Link to="/careers" className="hover:text-rose-600 transition-colors">Careers</Link></li>
                        <li><Link to="/contact" className="hover:text-rose-600 transition-colors">Contact</Link></li>
                        <li><Link to="/privacy" className="hover:text-rose-600 transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-rose-600 transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Services Links */}
                <div>
                    <h3 className="font-semibold text-gray-900 tracking-wide uppercase text-xs mb-6">Discover</h3>
                    <ul className="space-y-3">
                        <li><Link to="/services" className="hover:text-rose-600 transition-colors">All Services</Link></li>
                        <li><Link to="/book" className="hover:text-rose-600 transition-colors">Book an Appointment</Link></li>
                        <li><Link to="/favorites" className="hover:text-rose-600 transition-colors">My Favorites</Link></li>
                        <li><Link to="/faq" className="hover:text-rose-600 transition-colors">FAQ</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="font-semibold text-gray-900 tracking-wide uppercase text-xs mb-6">Stay Updated</h3>
                    <p className="mb-4 text-xs text-gray-600">Subscribe to our newsletter for the latest beauty trends and exclusive offers.</p>
                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-4 py-2.5 bg-white border border-rose-200 text-gray-900 rounded focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all text-sm placeholder-gray-400"
                        />
                        <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded font-medium transition-colors text-sm uppercase tracking-wide shadow-md hover:shadow-lg">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-rose-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; 2025 SalonWala. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link to="/privacy" className="hover:text-rose-600 transition-colors">Privacy</Link>
                    <Link to="/terms" className="hover:text-rose-600 transition-colors">Terms</Link>
                    <Link to="/contact" className="hover:text-rose-600 transition-colors">Sitemap</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
