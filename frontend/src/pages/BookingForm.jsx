import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchServices } from '../store/servicesSlice';
import { createBooking, resetCreateStatus } from '../store/bookingsSlice';

const BookingForm = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items: services } = useSelector((state) => state.services);
    const { createStatus, createError } = useSelector((state) => state.bookings);
    const { user } = useSelector((state) => state.auth);
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        if (services.length === 0) {
            dispatch(fetchServices());
        }
    }, [dispatch, services]);

    useEffect(() => {
        if (createStatus === 'succeeded') {
            const timer = setTimeout(() => {
                dispatch(resetCreateStatus());
                navigate('/bookings');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [createStatus, navigate, dispatch]);

    const formik = useFormik({
        initialValues: {
            firstName: user ? user.name.split(' ')[0] : '',
            lastName: user ? user.name.split(' ').slice(1).join(' ') : '',
            email: user ? user.email : '',
            phone: '',
            chooseWhom: '',
            stylist: '',
            gender: '',
            serviceType: serviceId || '',
            category: '',
            date: '',
            time: '',
            message: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string().required('Required'),
            serviceType: Yup.string().required('Required'),
            date: Yup.date().required('Required'),
            time: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            console.log('Form values:', values);
            if (!agreed) {
                console.log('Agreement checkbox not checked');
                return;
            }
            const service = services.find(s => s.id === parseInt(values.serviceType));
            console.log('Found service:', service);
            const bookingData = {
                serviceId: parseInt(values.serviceType),
                serviceName: service?.name || 'Unknown Service',
                date: values.date,
                time: values.time,
                notes: values.message,
                userId: user?.id,
                customerName: `${values.firstName} ${values.lastName}`
            };
            console.log('Sending booking data:', bookingData);
            dispatch(createBooking(bookingData));
        },
    });

    const selectedService = services.find(s => s.id === parseInt(formik.values.serviceType));
    const totalPrice = selectedService ? selectedService.price : 0;

    if (createStatus === 'succeeded') {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-green-50 rounded-2xl text-center shadow-lg border border-green-100">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Ready to take the first step toward your dream property? Fill out the form below, and our real estate wizards will work their magic to find your perfect match.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Row 1: Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                {...formik.getFieldProps('firstName')}
                                placeholder="Enter First Name"
                                className={`w-full bg-gray-50 border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {formik.touched.firstName && formik.errors.firstName && <div className="text-red-500 text-[10px] mt-1">{formik.errors.firstName}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                {...formik.getFieldProps('lastName')}
                                placeholder="Enter Last Name"
                                className={`w-full bg-gray-50 border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {formik.touched.lastName && formik.errors.lastName && <div className="text-red-500 text-[10px] mt-1">{formik.errors.lastName}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                {...formik.getFieldProps('email')}
                                placeholder="Enter your Email"
                                className={`w-full bg-gray-50 border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {formik.touched.email && formik.errors.email && <div className="text-red-500 text-[10px] mt-1">{formik.errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                {...formik.getFieldProps('phone')}
                                placeholder="Enter Phone Number"
                                className={`w-full bg-gray-50 border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-[10px] mt-1">{formik.errors.phone}</div>}
                        </div>
                    </div>

                    {/* Row 2: Choose Whom */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Choose Whom</label>
                        <select
                            {...formik.getFieldProps('chooseWhom')}
                            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors appearance-none"
                        >
                            <option value="">Select gender</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                        </select>
                    </div>

                    {/* Row 3: Selections */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Choose Stylist</label>
                            <select
                                {...formik.getFieldProps('stylist')}
                                className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors appearance-none"
                            >
                                <option value="">Select Stylist</option>
                                <option value="alex">Alex</option>
                                <option value="sarah">Sarah</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                            <select
                                {...formik.getFieldProps('gender')}
                                className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors appearance-none"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Services Type <span className="text-red-500">*</span></label>
                            <select
                                {...formik.getFieldProps('serviceType')}
                                className={`w-full bg-gray-50 border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors appearance-none ${formik.errors.serviceType ? 'border-red-500' : 'border-gray-200'}`}
                            >
                                <option value="">Select Services</option>
                                {services.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                            {formik.touched.serviceType && formik.errors.serviceType && <div className="text-red-500 text-[10px] mt-1">{formik.errors.serviceType}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
                            <select
                                {...formik.getFieldProps('category')}
                                className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors appearance-none"
                            >
                                <option value="">Select Category</option>
                                {[...new Set(services.map(s => s.category))].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 4: Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    {...formik.getFieldProps('date')}
                                    className={`w-full bg-gray-50 border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors ${formik.errors.date && formik.touched.date ? 'border-red-500' : 'border-gray-200'}`}
                                />
                                {formik.touched.date && formik.errors.date && <div className="text-red-500 text-[10px] mt-1">{formik.errors.date}</div>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Time <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select
                                    {...formik.getFieldProps('time')}
                                    className={`w-full bg-gray-50 border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors appearance-none ${formik.errors.time && formik.touched.time ? 'border-red-500' : 'border-gray-200'}`}
                                >
                                    <option value="">Select Time</option>
                                    <option value="09:00">09:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="13:00">01:00 PM</option>
                                </select>
                                {formik.touched.time && formik.errors.time && <div className="text-red-500 text-[10px] mt-1">{formik.errors.time}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Row 5: Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                            {...formik.getFieldProps('message')}
                            rows="4"
                            placeholder="Enter your Message here..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors resize-none"
                        ></textarea>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-4">
                        <div className="flex items-center gap-1 mb-4 md:mb-0">
                            <span className="text-sm font-medium text-gray-500">Total</span>
                            <span className="text-2xl font-bold text-gray-900">
                                {totalPrice > 0 ? `$${totalPrice.toLocaleString()}` : '$0'}
                            </span>
                        </div>

                        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="h-4 w-4 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                                />
                                <span className="text-xs text-gray-500">I agree with Terms of Use and Privacy Policy</span>
                            </label>

                            <button
                                type="submit"
                                disabled={!agreed || createStatus === 'loading'}
                                className={`px-8 py-3 rounded-md text-white font-medium text-sm transition-all ${agreed && createStatus !== 'loading'
                                    ? 'bg-rose-500 hover:bg-rose-600 shadow-md hover:shadow-lg'
                                    : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                {createStatus === 'loading' ? 'Processing...' : 'Book Now'}
                            </button>
                        </div>
                    </div>
                    {createError && <div className="text-red-500 text-sm mt-2 text-center">{createError}</div>}
                </form>
            </div>
        </div>
    );
};

export default BookingForm;
