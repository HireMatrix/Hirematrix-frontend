import { configureStore } from '@reduxjs/toolkit';
import jobSearchSlice from '../features/jobSearch/jobSearchSlice';
import filterSlice from '../features/filter/filterSlice';
import authSlice from '../features/auth/authSlice';
import transcriptionSlice from '../features/transcription/transcriptionSlice';
// import adminSlice from '../features/admin/adminSlice';

export const store = configureStore({
    reducer: {
        jobSearch: jobSearchSlice,
        filter: filterSlice,
        auth: authSlice,
        transcription: transcriptionSlice
    }
});