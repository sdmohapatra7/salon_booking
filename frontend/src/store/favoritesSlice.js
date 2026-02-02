import { createSlice } from '@reduxjs/toolkit';

// Helper to load from storage
const loadFavorites = () => {
    try {
        const serialized = localStorage.getItem('salon_favorites');
        if (serialized === null) {
            return [];
        }
        return JSON.parse(serialized);
    } catch (err) {
        return [];
    }
};

const initialState = {
    items: loadFavorites(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            // Check if already exists
            const exists = state.items.find(item => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
                localStorage.setItem('salon_favorites', JSON.stringify(state.items));
            }
        },
        removeFromFavorites: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('salon_favorites', JSON.stringify(state.items));
        }
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
