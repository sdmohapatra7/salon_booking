import React from 'react';

const Contact = () => {
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Contact Us
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        We'd love to hear from you. Check us out on social media or send us a message.
                    </p>
                </div>
                <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
                    <p className="text-gray-600">
                        For appointments and inquiries, please email us at <br />
                        <a href="mailto:hello@hairrapbyyoyo.com" className="text-rose-600 font-bold hover:underline">hello@hairrapbyyoyo.com</a>
                    </p>
                    <p className="mt-4 text-gray-600">
                        Or verify us out on Instagram: <br />
                        <span className="font-bold">@hairrapbyyoyo</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
