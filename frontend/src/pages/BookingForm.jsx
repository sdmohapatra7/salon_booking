import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchServices } from '../store/servicesSlice';
import { createBooking, resetCreateStatus } from '../store/bookingsSlice';
import { updateLoyaltyPoints } from '../store/authSlice';
import { fetchStaff } from '../store/staffSlice';
import { format } from 'date-fns';
import api from '../api/axiosConfig';
import PaymentForm from '../components/PaymentForm';
import CalendarPicker from '../components/CalendarPicker';

const BookingForm = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items: services } = useSelector((state) => state.services);
    const { items: staffMembers } = useSelector((state) => state.staff);
    const { createStatus, createError } = useSelector((state) => state.bookings);
    const { user } = useSelector((state) => state.auth);
    const [agreed, setAgreed] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [usePoints, setUsePoints] = useState(false);
    const [workingHours, setWorkingHours] = useState([]);

    useEffect(() => {
        if (services.length === 0) {
            dispatch(fetchServices());
        }
        dispatch(fetchStaff());

        const fetchHours = async () => {
            const response = await api.get('/working-hours');
            setWorkingHours(response.data);
        };
        fetchHours();
    }, [dispatch, services]);

    const handlePayment = async (data) => {
        setIsProcessing(true);
        try {
            // 1. Create the booking (Status: Pending)
            const response = await dispatch(createBooking(data)).unwrap();
            
            // 2. Create Stripe Checkout Session
            const paymentResponse = await api.post('/payments/create-checkout-session', {
                bookingId: response.id
            });

            // 3. Redirect to Stripe Checkout
            if (paymentResponse.data.url) {
                window.location.href = paymentResponse.data.url;
            } else {
                throw new Error('Failed to create payment session');
            }
        } catch (err) {
            console.error('Booking/Payment Error:', err);
            alert('Failed to process booking. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: user ? user.name.split(' ')[0] : '',
            lastName: user ? user.name.split(' ').slice(1).join(' ') : '',
            email: user ? user.email : '',
            phone: user?.phone || '',
            chooseWhom: '',
            staffId: '',
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
            staffId: Yup.string().required('Please select a stylist'),
            date: Yup.date().required('Required'),
            time: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            if (!agreed) {
                alert('Please agree to terms');
                return;
            }
            const service = services.find(s => s.id === parseInt(values.serviceType));
            const data = {
                serviceId: parseInt(values.serviceType),
                serviceName: service?.name || 'Unknown Service',
                staffId: values.staffId,
                date: values.date,
                time: values.time,
                notes: values.message,
                userId: user?.id,
                customerName: `${values.firstName} ${values.lastName}`,
                phone: values.phone,
                usePoints: usePoints
            };
            handlePayment(data);
        },
    });

    const selectedService = services.find(s => s.id === parseInt(formik.values.serviceType));
    const servicePrice = selectedService ? parseFloat(selectedService.price) : 0;
    
    const maxPointsRedeemable = Math.min(user?.loyaltyPoints || 0, servicePrice * 100);
    const discount = usePoints ? maxPointsRedeemable / 100 : 0;
    const totalPrice = servicePrice - discount;

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rose-500"></div>
                <p className="text-xl font-medium text-gray-700">Redirecting to Secure Payment...</p>
                <p className="text-gray-500 text-sm">Please do not close this window.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Securely complete your payment to confirm booking.
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Stylist <span className="text-red-500">*</span></label>
                                <select
                                    {...formik.getFieldProps('staffId')}
                                    className={`w-full bg-gray-50 border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:bg-white transition-colors appearance-none ${formik.touched.staffId && formik.errors.staffId ? 'border-red-500' : 'border-gray-200'}`}
                                >
                                    <option value="">Select Stylist</option>
                                    {staffMembers.map(staff => (
                                        <option key={staff.id} value={staff.id}>{staff.name} - {staff.specialty}</option>
                                    ))}
                                </select>
                                {formik.touched.staffId && formik.errors.staffId && <div className="text-red-500 text-[10px] mt-1">{formik.errors.staffId}</div>}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">Select Date <span className="text-red-500">*</span></label>
                                <CalendarPicker
                                    selectedDate={formik.values.date ? new Date(formik.values.date) : null}
                                    onDateChange={(date) => formik.setFieldValue('date', format(date, 'yyyy-MM-dd'))}
                                    closedDays={workingHours.filter(h => h.isClosed).map(h => h.dayOfWeek)}
                                />
                                {formik.touched.date && formik.errors.date && <div className="text-red-500 text-xs mt-2 font-medium">{formik.errors.date}</div>}
                                {formik.values.date && (
                                    <p className="mt-3 text-sm text-gray-500">
                                        Selected: <span className="font-semibold text-rose-600">{format(new Date(formik.values.date), 'EEEE, MMMM do')}</span>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">Select Time <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-2 gap-3">
                                    {(() => {
                                        if (!formik.values.date) return <p className="text-gray-400 text-xs col-span-2">Please select a date first</p>;
                                        
                                        const selectedDateObj = new Date(formik.values.date);
                                        const dayInfo = workingHours.find(h => h.dayOfWeek === selectedDateObj.getDay());
                                        
                                        if (!dayInfo || dayInfo.isClosed) return <p className="text-red-400 text-xs col-span-2">Salon is closed on this day</p>;

                                        const allSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
                                        const availableSlots = allSlots.filter(slot => {
                                            return slot >= dayInfo.openTime && slot < dayInfo.closeTime;
                                        });

                                        return availableSlots.map((slot) => (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => formik.setFieldValue('time', slot)}
                                                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                                                    formik.values.time === slot
                                                    ? 'bg-rose-500 text-white shadow-lg scale-105'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                                                }`}
                                            >
                                                {format(new Date(`2000-01-01T${slot}`), 'hh:mm a')}
                                            </button>
                                        ));
                                    })()}
                                </div>
                                {formik.touched.time && formik.errors.time && <div className="text-red-500 text-xs mt-4 font-medium">{formik.errors.time}</div>}
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
                            <div className="flex flex-col items-start gap-1 mb-4 md:mb-0">
                                <span className="text-sm font-medium text-gray-500">Total Price</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${totalPrice.toLocaleString()}
                                    </span>
                                    {discount > 0 && (
                                        <span className="text-sm text-green-600 font-medium">(-${discount} discount)</span>
                                    )}
                                </div>
                                {user?.loyaltyPoints > 0 && !showPayment && (
                                    <label className="flex items-center gap-2 mt-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={usePoints}
                                            onChange={(e) => setUsePoints(e.target.checked)}
                                            className="h-4 w-4 text-rose-500 rounded border-gray-300 focus:ring-rose-500"
                                        />
                                        <span className="text-xs text-gray-600 group-hover:text-rose-600 transition-colors">
                                            Use my Loyalty Points (Balance: {user.loyaltyPoints} pts)
                                        </span>
                                    </label>
                                )}
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
                                    disabled={!agreed}
                                    className={`px-8 py-3 rounded-md text-white font-medium text-sm transition-all ${agreed
                                        ? 'bg-rose-500 hover:bg-rose-600 shadow-md hover:shadow-lg'
                                        : 'bg-gray-300 cursor-not-allowed'
                                        }`}
                                >
                                    Proceed to Payment
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
