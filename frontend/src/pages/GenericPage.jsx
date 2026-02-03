import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const pageContent = {
    'about': {
        title: 'About Us',
        content: (
            <div className="space-y-6 text-gray-600">
                <p>Welcome to SalonWala, your premier destination for luxury beauty and wellness services. Established in 2025, we have been dedicated to providing exceptional salon experiences tailored to your unique style and needs.</p>
                <p>Our team of expert stylists and therapists are passionate about their craft, using only the finest products and techniques to ensure you look and feel your absolute best.</p>
                <h3 className="text-xl font-bold text-gray-900 mt-8">Our Mission</h3>
                <p>To empower individuals to express their beauty with confidence through world-class services, innovation, and care.</p>
            </div>
        )
    },
    'careers': {
        title: 'Join Our Team',
        content: (
            <div className="space-y-6 text-gray-600">
                <p>Are you a passionate stylist, therapist, or salon manager? We are always looking for talented individuals to join our growing family.</p>
                <div className="bg-rose-50 p-6 rounded-xl border border-rose-100 my-6">
                    <h3 className="font-bold text-gray-900">Current Openings</h3>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                        <li>Senior Hair Stylist - New York</li>
                        <li>Nail Technician - Brooklyn</li>
                        <li>Salon Manager - Manhattan</li>
                    </ul>
                </div>
                <p>Send your resume and portfolio to <span className="text-rose-600 font-medium">careers@salonwala.com</span>.</p>
            </div>
        )
    },
    'faq': {
        title: 'Frequently Asked Questions',
        content: (
            <div className="space-y-8">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">How do I book an appointment?</h3>
                    <p className="text-gray-600 mt-2">You can book directly through our website by selecting a service, choosing your preferred stylist, and picking a time slot that works for you.</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">What is your cancellation policy?</h3>
                    <p className="text-gray-600 mt-2">We ask for at least 24 hours notice for cancellations. Cancellations made within 24 hours may be subject to a fee.</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Do you offer gift cards?</h3>
                    <p className="text-gray-600 mt-2">Yes! Digital gift cards are available for purchase online and can be redeemed for any of our services.</p>
                </div>
            </div>
        )
    },
    'privacy': {
        title: 'Privacy Policy',
        content: (
            <div className="space-y-6 text-gray-600 text-sm">
                <p>Last Updated: Jan 2025</p>
                <p>Your privacy is important to us. This Privacy Policy explains how SalonWala collects, uses, and protects your personal information.</p>
                <h4 className="font-bold text-gray-900">Information We Collect</h4>
                <p>We collect information you provide directly to us when you create an account, book an appointment, or contact us.</p>
                <h4 className="font-bold text-gray-900">How We Use Information</h4>
                <p>We use your information to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
            </div>
        )
    },
    'terms': {
        title: 'Terms of Service',
        content: (
            <div className="space-y-6 text-gray-600 text-sm">
                <p>By accessing or using SalonWala, you agree to be bound by these Terms of Service.</p>
                <h4 className="font-bold text-gray-900">1. Acceptance of Terms</h4>
                <p>By accessing our website and services, you agree to these terms.</p>
                <h4 className="font-bold text-gray-900">2. Booking and Payments</h4>
                <p>All bookings are subject to availability. Prices are subject to change without notice.</p>
                <h4 className="font-bold text-gray-900">3. User Conduct</h4>
                <p>You agree not to misuse our services or interfere with the operation of our platform.</p>
            </div>
        )
    }
};

const GenericPage = ({ type }) => {
    const { pathname } = useLocation();

    // Auto-scroll to top on page navigation
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const pageKey = type || pathname.replace('/', '');
    // Fallback if direct mapping doesn't match exactly (e.g. /terms -> terms)
    const data = pageContent[pageKey] || pageContent['about'];

    return (
        <div className="min-h-screen bg-gray-50 pt-16 pb-24">
            <div className="bg-gray-900 text-white py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-light mb-4">{data.title}</h1>
                    <div className="h-1 w-20 bg-rose-500 mx-auto rounded-full"></div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 -mt-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
                    {data.content}
                </div>
            </div>
        </div>
    );
};

export default GenericPage;
