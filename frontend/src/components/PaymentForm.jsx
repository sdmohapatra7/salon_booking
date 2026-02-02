import React, { useState } from 'react';

const PaymentForm = ({ onSubmit, onCancel, amount }) => {
    const [loading, setLoading] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvv: ''
    });

    const handlePay = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Payment Gateway Delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
        onSubmit(); // Proceed to booking
    };

    const handleChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">3</span>
                Payment Details
            </h3>

            <div className="mb-4 bg-white p-4 rounded shadow-sm">
                <p className="text-gray-600 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">${amount}</p>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                        type="text"
                        name="number"
                        placeholder="0000 0000 0000 0000"
                        className="w-full border p-2 rounded"
                        maxLength="19"
                        required
                        value={cardDetails.number}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                        <input
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            className="w-full border p-2 rounded"
                            maxLength="5"
                            required
                            value={cardDetails.expiry}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            className="w-full border p-2 rounded"
                            maxLength="3"
                            required
                            value={cardDetails.cvv}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-1/2 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
                        disabled={loading}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-1/2 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 flex justify-center items-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            `Pay $${amount}`
                        )}
                    </button>
                </div>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
                🔒 Secure Mock Payment (No real money involved)
            </p>
        </div>
    );
};

export default PaymentForm;
