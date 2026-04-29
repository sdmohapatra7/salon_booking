import React, { useState } from 'react';
import api from '../api/axiosConfig';

const GiftCards = () => {
    const [amount, setAmount] = useState(50);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBuy = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/gift-cards/buy', { amount, recipientEmail });
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (err) {
            console.error(err);
            alert('Failed to initiate gift card purchase.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-black text-gray-900 mb-6">Gift the Glow</h1>
                <p className="text-xl text-gray-600">Surprise your loved ones with a digital gift card they can use for any of our luxury services.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Gift Card Preview */}
                <div className="relative aspect-[1.6/1] bg-gradient-to-br from-rose-400 to-rose-600 rounded-3xl p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
                    
                    <div className="flex justify-between items-start">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                        </div>
                        <span className="text-white text-3xl font-black">${amount}</span>
                    </div>

                    <div>
                        <h3 className="text-white text-sm font-bold uppercase tracking-widest opacity-80 mb-1">Gift Card Code</h3>
                        <p className="text-white text-xl font-mono tracking-tighter">SALON-XXXX-XXXX</p>
                    </div>

                    <p className="text-white/60 text-[10px] font-medium italic">Redeemable for all services at Salon Booking System</p>
                </div>

                {/* Purchase Form */}
                <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl">
                    <form onSubmit={handleBuy} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Select Amount</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[25, 50, 100].map(val => (
                                    <button 
                                        key={val}
                                        type="button"
                                        onClick={() => setAmount(val)}
                                        className={`py-3 rounded-xl font-bold transition-all ${amount === val ? 'bg-rose-500 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                    >
                                        ${val}
                                    </button>
                                ))}
                            </div>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="mt-4 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                placeholder="Custom Amount"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Recipient Email</label>
                            <input 
                                type="email" 
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                                placeholder="Who are we sending this to?"
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-4 bg-rose-500 text-white font-black rounded-xl shadow-lg shadow-rose-100 hover:bg-rose-600 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Buy Gift Card Now'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GiftCards;
