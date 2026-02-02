import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transform scale-105 animate-[zoomIn_20s_infinite_alternate]"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 py-32 sm:py-48 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[85vh]">
                    <div className="max-w-3xl animate-[fadeInUp_1s_ease-out]">
                        <h2 className="text-rose-500 font-bold tracking-wider uppercase mb-4 text-sm md:text-base">
                            Welcome to Hair Rap by Yoyo
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            Beauty & Elegance <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">
                                Redefined.
                            </span>
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                            Experience premium styling, top-tier service, and a look that defines explicitly you. Your journey to perfection starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/services" className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-rose-500/30 shadow-lg transform hover:-translate-y-1 text-center">
                                Book Appointment
                            </Link>
                            <Link to="/services" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-all hover:shadow-lg text-center flex items-center justify-center gap-2">
                                <span>View Services</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Banner */}
            <div className="bg-rose-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold mb-1">5000+</div>
                        <div className="text-rose-100 text-sm uppercase tracking-wide">Happy Clients</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-1">10+</div>
                        <div className="text-rose-100 text-sm uppercase tracking-wide">Expert Stylists</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-1">100%</div>
                        <div className="text-rose-100 text-sm uppercase tracking-wide">Satisfaction</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-1">24/7</div>
                        <div className="text-rose-100 text-sm uppercase tracking-wide">Support</div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-base text-rose-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
                        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            We bring out the best version of you
                        </h3>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            More than just a salon, we are a sanctuary for style and self-care.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Expert Stylists",
                                desc: "Our team consists of certified professionals with years of experience in modern styling.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                )
                            },
                            {
                                title: "Easy Booking",
                                desc: "Book your appointment in seconds with our seamless online system. managing your time has never been easier.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                )
                            },
                            {
                                title: "Premium Products",
                                desc: "We only use top-tier, eco-friendly products that are safe for you and the environment.",
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                )
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900">What Our Clients Say</h2>
                        <div className="w-24 h-1 bg-rose-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Johnson", role: "Regular Client", text: "The best salon experience I've ever had. The attention to detail is unmatched!", img: "https://randomuser.me/api/portraits/women/44.jpg" },
                            { name: "Michael Chen", role: "Business Professional", text: "Incredible service. I book my appointments online and they are always on time.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
                            { name: "Emily Davis", role: "Fashion Blogger", text: "I trust no one else with my hair. Yoyo and the team are absolute magicians!", img: "https://randomuser.me/api/portraits/women/68.jpg" }
                        ].map((t, idx) => (
                            <div key={idx} className="bg-gray-50 p-8 rounded-2xl relative">
                                <svg className="absolute top-4 right-4 w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.896 14.325 16.053 14.941 15.471C15.558 14.888 16.398 14.597 17.461 14.597L17.5 14.597L17.5 10.252C17.5 10.252 17.375 10.252 17.125 10.252C16.208 10.252 15.392 10.027 14.675 9.577C13.958 9.127 13.567 8.351 13.501 7.249L16.299 7.249C16.299 8.016 16.541 8.566 17.025 8.899C17.509 9.232 18.233 9.399 19.2 9.399L19.2 12.062L19.163 12.062C18.429 12.062 17.904 12.27 17.587 12.687C17.271 13.104 17.113 13.846 17.113 14.912L17.113 21L14.017 21ZM5.017 21L5.017 18C5.017 16.896 5.325 16.053 5.941 15.471C6.558 14.888 7.398 14.597 8.461 14.597L8.5 14.597L8.5 10.252C8.5 10.252 8.375 10.252 8.125 10.252C7.208 10.252 6.392 10.027 5.675 9.577C4.958 9.127 4.567 8.351 4.501 7.249L7.299 7.249C7.299 8.016 7.541 8.566 8.025 8.899C8.509 9.232 9.233 9.399 10.2 9.399L10.2 12.062L10.163 12.062C9.429 12.062 8.904 12.27 8.587 12.687C8.271 13.104 8.113 13.846 8.113 14.912L8.113 21L5.017 21Z" /></svg>
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-rose-500" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                                        <p className="text-sm text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"{t.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-24 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready for your new look?</h2>
                    <p className="text-xl text-gray-300 mb-10">Don't wait. Our calendar fills up quickly. Secure your spot today.</p>
                    <Link to="/services" className="inline-flex items-center justify-center bg-white text-gray-900 font-bold py-4 px-12 rounded-full hover:bg-rose-50 transition-colors shadow-lg text-lg">
                        Book Your Appointment
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Home;
