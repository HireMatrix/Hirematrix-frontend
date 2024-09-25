import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    sortBy: 'Relevant',
    experience: 21,
    salary: 0,
    datePosted: 'All',
    highestEducation: '',
    workMode: [],
    workType: [],
    workShift: [],
    department: [],
    englishLevel: '',
    gender: '',
}



const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            state[action.payload.key] = action.payload.value
        },
        removeFilter: (state, action) => {
            state[action.payload] = initialState[action.payload]
        },
        resetFilter: () => initialState
    },
})

export const { 
    updateFilter,
    removeFilter,
    resetFilter
} = filterSlice.actions

export default filterSlice.reducer