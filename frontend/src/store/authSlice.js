import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

// Async Login
export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
});

// Async Register
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
});

// Helper to get user from local storage
const getUserFromStorage = () => {
    const user = localStorage.getItem('salon_user');
    return user ? JSON.parse(user) : null;
};

// Async Validate 2FA for Login
export const validate2FA = createAsyncThunk('auth/validate2FA', async ({ userId, token }, { rejectWithValue }) => {
    try {
        const response = await api.post('/2fa/validate', { userId, token });
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Invalid Token');
    }
});

export const loginWithGoogle = createAsyncThunk('auth/google', async (token, { rejectWithValue }) => {
    try {
        const response = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { ...response.data, token };
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || 'Google Login failed');
    }
});

const initialState = {
    user: getUserFromStorage(),
    isAuthenticated: !!localStorage.getItem('salon_user'),
    status: 'idle',
    error: null,
    requiresTwoFactor: false,
    tempUserId: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.requiresTwoFactor = false;
            state.tempUserId = null;
            localStorage.removeItem('salon_user');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.twoFactorRequired) {
                    state.status = 'succeeded'; // Technically API call succeeded
                    state.requiresTwoFactor = true;
                    state.tempUserId = action.payload.userId;
                    state.isAuthenticated = false; // Not fully auth yet
                } else {
                    state.status = 'succeeded';
                    state.isAuthenticated = true;
                    state.user = action.payload;
                    state.requiresTwoFactor = false;
                    localStorage.setItem('salon_user', JSON.stringify(action.payload));
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Google Login
            .addCase(loginWithGoogle.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = action.payload;
                state.requiresTwoFactor = false; // Google auth usually skips 2FA or handles it there
                localStorage.setItem('salon_user', JSON.stringify(action.payload));
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Validate 2FA
            .addCase(validate2FA.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(validate2FA.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = action.payload; // Payload should be full user obj with token
                state.requiresTwoFactor = false;
                state.tempUserId = null;
                localStorage.setItem('salon_user', JSON.stringify(action.payload));
            })
            .addCase(validate2FA.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = action.payload;
                state.requiresTwoFactor = false;
                localStorage.setItem('salon_user', JSON.stringify(action.payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
