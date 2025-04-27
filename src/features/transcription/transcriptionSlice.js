import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    finalText: "",
    partialText: ""
}

const transcriptionSlice = createSlice({
    name: "transcription",
    initialState,
    reducers: {
        setFinalText: (state, action) => {
            state.finalText += action.payload + " ";
        },
        setPartialText: (state, action) => {
            state.partialText = action.payload;
        },
        resetTranscription: () => initialState
    }
});

export const { setFinalText, setPartialText, resetTranscription } = transcriptionSlice.actions;
export default transcriptionSlice.reducer;