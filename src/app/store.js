import { configureStore } from '@reduxjs/toolkit';
import jobSearchSlice from '../features/jobSearch/jobSearchSlice';
import filterSlice from '../features/filter/filterSlice';
import filterFetchSlice from '../features/filter/filterFetchSlice';
import authSlice from '../features/auth/authSlice';
// import adminSlice from '../features/admin/adminSlice';

export const store = configureStore({
    reducer: {
        jobSearch: jobSearchSlice,
        filter: filterSlice,
        filterFetch: filterFetchSlice,
        auth: authSlice,
    }
});