import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchcontent: '',
    locationcontent: ''
}

const jobSearchSlice = createSlice({
    name: 'jobSearch',
    initialState,
    reducers: {
        setSearchContent: (state, action) => {
            state.searchcontent = action.payload;
        },
        setLocationContent: (state, action) => {
            state.locationcontent = action.payload
        },
        resetSearchContent: () => {
            initialState.searchcontent
        },
        resetLocationContent: () => {
            initialState.locationcontent
        }
    }
});

export const {setSearchContent, setLocationContent} = jobSearchSlice.actions

export default jobSearchSlice.reducer