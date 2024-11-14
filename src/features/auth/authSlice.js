import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const signIn = createAsyncThunk('auth/signin', async (userDetails, {rejectWithValue}) => {
    // console.log(process.env.REACT_APP_API_URL);
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
        })

        if (!response.ok) {
            const data = await response.json();
            return rejectWithValue(data.message || 'Failed to sign in');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message == undefined ? error.message : 'An Error occurred during sign in')
    }
})

const initialState = {
    user: null,
    isAuthenticated: false,
    error: false,
    errMessage: null,
    isLoading: false,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.isLoading = true
                state.error = false
                state.errMessage = null
            })
            .addCase(signIn.rejected, (state,action) => {
                state.isLoading = false
                state.error = true
                state.errMessage = action.payload
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated  = true
                state.user = action.payload
                state.error = false
            })
    }
})

export default authSlice.reducer

