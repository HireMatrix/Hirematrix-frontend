// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchedJobs = createAsyncThunk(
//     'jobs/fetchedJobs',
//     async (filters, { rejectWithValue }) => {
//         try {
//             // console.log('Filters:', filters);
//             const queryParams = new URLSearchParams(filters);
//             const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs?${queryParams}`, {
//                 method: 'GET',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//             });

//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.message || `HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             // console.log('API Response:', data);
//             return data;
//         } catch (error) {
//             // console.error('Fetch error:', error);
//             return rejectWithValue(error.message || 'An error occurred');
//         }
//     }
// );

// const initialState = {
//     jobs: [],
//     status: 'idle',
//     error: null
// }

// const filterFetchSlice = createSlice({
//     name: 'filterFetch',
//     initialState,
//     reducers: {
//         setJobs: (state, action) => {
//             state.jobs = action.payload;
//             state.status = 'success';
//             state.error = null;
//         },
//         setError: (state, action) => {
//             state.error = action.payload;
//             state.status = 'failed';
//         },
//         setLoading: (state) => {
//             state.status = 'loading';
//             state.error = null;
//         }
//     },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchedJobs.pending, (state) => {
    //             state.status = 'pending';
    //             state.error = null;
    //         })
    //         .addCase(fetchedJobs.fulfilled, (state, action) => {
    //             state.status = 'success';
    //             state.jobs = action.payload;
    //         })
    //         .addCase(fetchedJobs.rejected, (state, action) => {
    //             state.status = 'failed';
    //             state.error = action.payload;
    //         });
    // }
// })

// export const { setJobs, setError, setLoading } = filterFetchSlice.actions;

// export default filterFetchSlice.reducer;