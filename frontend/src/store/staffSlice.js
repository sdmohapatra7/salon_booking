import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';

export const fetchStaff = createAsyncThunk('staff/fetchStaff', async () => {
    const response = await api.get('/staff');
    return response.data;
});

const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStaff.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStaff.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchStaff.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default staffSlice.reducer;
