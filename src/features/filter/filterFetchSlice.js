import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchedJobs = createAsyncThunk('jobs/fetchedJobs', async(filters) => {
    const queryParams = new URLSearchParams(filters)
    const response = await fetch(`http://localhost:3000/jobs?${queryParams}`);
    const data = await response.json()
    return data;
})

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
            .addCase(fetchedJobs.fulfilled, (state, action) => {
                state.status = 'success';
                state.jobs = action.payload; 
            })
    }
})

export default filterFetchSlice.reducer;