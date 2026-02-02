import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, validate2FA, loginWithGoogle } from '../store/authSlice';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams(); // Get URL params
    const { status, error, requiresTwoFactor, tempUserId, isAuthenticated } = useSelector((state) => state.auth);
    const [twoFactorToken, setTwoFactorToken] = useState('');

    useEffect(() => {
        // Check for Google Auth Token
        const token = searchParams.get('token');
        const googleError = searchParams.get('error');

        if (token && !isAuthenticated) {
            dispatch(loginWithGoogle(token));
        } else if (googleError) {
            // Handle error UI if needed
        }

        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate, searchParams, dispatch]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values));
        },
    });

    const handleTwoFactorSubmit = (e) => {
        e.preventDefault();
        if (twoFactorToken.length === 6) {
            dispatch(validate2FA({ userId: tempUserId, token: twoFactorToken }));
        }
    };

    if (requiresTwoFactor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                    <div className="text-center">
                        <span className="font-serif tracking-widest font-bold text-rose-600 text-2xl uppercase">HAIR RAP</span>
                        <h2 className="mt-6 text-2xl font-bold text-gray-900">Two-Factor Validaton</h2>
                        <p className="mt-2 text-sm text-gray-600">Enter the 6-digit code from Google Authenticator</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-700 px-4 py-3 rounded text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleTwoFactorSubmit}>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                maxLength="6"
                                value={twoFactorToken}
                                onChange={(e) => setTwoFactorToken(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="000000"
                                className="block w-48 px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading' || twoFactorToken.length !== 6}
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Verifying...' : 'Verify Code'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <span className="font-serif tracking-widest font-bold text-rose-600 text-2xl uppercase">
                        HAIR RAP
                    </span>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to manage your bookings
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-1 border-red-500 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                {...formik.getFieldProps('email')}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                {...formik.getFieldProps('password')}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-rose-600 hover:text-rose-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 shadow-md transition-all ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {status === 'loading' ? 'Signing in...' : 'Log in'}
                        </button>

                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">OR</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <button
                            type="button"
                            onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors align-center gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-rose-600 hover:text-rose-500">
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
