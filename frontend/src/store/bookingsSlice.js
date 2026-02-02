import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    const response = await api.get('/bookings');
    return response.data;
});

export const createBooking = createAsyncThunk('bookings/createBooking', async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data.booking;
});

export const cancelBooking = createAsyncThunk('bookings/cancelBooking', async (bookingId) => {
    const response = await api.post(`/bookings/${bookingId}/cancel`);
    return response.data.booking;
});

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        createStatus: 'idle', // separate status for creation
        createError: null,
        cancelStatus: 'idle'
    },
    reducers: {
        resetCreateStatus: (state) => {
            state.createStatus = 'idle';
            state.createError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Bookings
            .addCase(fetchBookings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Create Booking
            .addCase(createBooking.pending, (state) => {
                state.createStatus = 'loading';
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.createStatus = 'succeeded';
                // Optimistically add the new booking or re-fetch (choice: add here)
                // Note: mock returns the booking object
                state.items.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.createStatus = 'failed';
                state.createError = action.error.message;
            })
            // Cancel Booking
            .addCase(cancelBooking.pending, (state) => {
                state.cancelStatus = 'loading';
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.cancelStatus = 'succeeded';
                // Update the booking in the list
                const index = state.items.findIndex(b => b.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(cancelBooking.rejected, (state) => {
                state.cancelStatus = 'failed';
            });
    }
});

export const { resetCreateStatus } = bookingsSlice.actions;
export default bookingsSlice.reducer;
