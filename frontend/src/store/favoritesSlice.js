import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
    const response = await api.get('/favorites');
    return response.data;
});

export const addToFavorites = createAsyncThunk('favorites/add', async (service) => {
    // We pass the whole service object for optimistic UI or just ID to backend
    const response = await api.post('/favorites', { serviceId: service.id });
    // Backend returns the service details
    return response.data;
});

export const removeFromFavorites = createAsyncThunk('favorites/remove', async (serviceId) => {
    const response = await api.delete(`/favorites/${serviceId}`);
    return response.data.serviceId;
});

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            // Add
            .addCase(addToFavorites.fulfilled, (state, action) => {
                // Avoid duplicates in store if backend doesn't return error but we retry
                const exists = state.items.find(i => i.id === action.payload.id);
                if (!exists) {
                    state.items.push(action.payload);
                }
            })
            // Remove
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
    }
});

export default favoritesSlice.reducer;
