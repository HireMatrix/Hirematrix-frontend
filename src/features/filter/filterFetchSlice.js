import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchedJobs = createAsyncThunk(
    'jobs/fetchedJobs',
    async (filters, { rejectWithValue }) => {
        try {
            // console.log('Filters:', filters);
            const queryParams = new URLSearchParams(filters);
            const response = await fetch(`http://localhost:3000/jobs?${queryParams}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // console.log('API Response:', data);
            return data;
        } catch (error) {
            // console.error('Fetch error:', error);
            return rejectWithValue(error.message || 'An error occurred');
        }
    }
);

const initialState = {
    jobs: [],
    status: 'idle',
    error: null
}

const filterFetchSlice = createSlice({
    name: 'filterFetch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchedJobs.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(fetchedJobs.fulfilled, (state, action) => {
                state.status = 'success';
                state.jobs = action.payload;
            })
            .addCase(fetchedJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
})

export default filterFetchSlice.reducer;