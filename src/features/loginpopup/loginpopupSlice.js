import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPopupVisible: false
}

const loginpopupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        togglePopup: (state) => {
            state.isPopupVisible = !state.isPopupVisible;
        }
    }
});

export const {togglePopup} = loginpopupSlice.actions

export default loginpopupSlice.reducer