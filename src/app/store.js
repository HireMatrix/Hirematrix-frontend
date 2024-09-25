import { configureStore } from '@reduxjs/toolkit';
import popupReducer from '../features/loginpopup/loginpopupSlice';
import jobSearchSlice from '../features/jobSearch/jobSearchSlice';
import filterSlice from '../features/filter/filterSlice';
import filterFetchSlice from '../features/filter/filterFetchSlice';

export const store = configureStore({
    reducer: {
        popup: popupReducer,
        jobSearch: jobSearchSlice,
        filter: filterSlice,
        filterFetch: filterFetchSlice
    }
});