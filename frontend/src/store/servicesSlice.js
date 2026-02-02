import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const response = await api.get('/services');
    return response.data;
});

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        items: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default servicesSlice.reducer;
