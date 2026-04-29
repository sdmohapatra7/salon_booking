import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../api/axiosConfig';

const PlanCard = ({ plan, onSubscribe, isCurrentPlan }) => {
    return (
        <div className={`relative p-8 rounded-3xl border ${isCurrentPlan ? 'border-rose-500 ring-4 ring-rose-50 shadow-2xl' : 'border-gray-200 shadow-lg'} bg-white transition-all hover:scale-105`}>
            {isCurrentPlan && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Your Current Plan
                </div>
            )}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                <span className="text-gray-500">/{plan.billingCycle}</span>
            </div>
            <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => onSubscribe(plan.id)}
                disabled={isCurrentPlan}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                    isCurrentPlan 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200'
                }`}
            >
                {isCurrentPlan ? 'Subscribed' : 'Choose Plan'}
            </button>
        </div>
    );
};

const Membership = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await api.get('/plans');
                setPlans(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handleSubscribe = async (planId) => {
        if (!user) {
            window.location.href = '/login?redirect=/membership';
            return;
        }
        try {
            const response = await api.post('/plans/subscribe', { planId });
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (err) {
            console.error('Subscription error:', err);
            alert('Failed to start subscription process.');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-black text-gray-900 mb-6">Elevate Your Salon Experience</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Join our exclusive membership program and enjoy premium benefits, priority booking, and significant savings on every visit.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <PlanCard 
                        key={plan.id} 
                        plan={plan} 
                        onSubscribe={handleSubscribe}
                        isCurrentPlan={user?.planId === plan.id && user?.subscriptionStatus === 'active'}
                    />
                ))}
            </div>

            <div className="mt-20 bg-gray-50 rounded-3xl p-12 text-center border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto mt-10">
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">Can I cancel anytime?</h4>
                        <p className="text-gray-600">Yes! You can manage and cancel your subscription directly from your dashboard settings.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">How do the discounts work?</h4>
                        <p className="text-gray-600">Discounts are automatically applied at checkout for all eligible services included in your plan.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;
