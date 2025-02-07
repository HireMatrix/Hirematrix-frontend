import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!response.ok) {
            const data = await response.json();
            return rejectWithValue(data.message || 'Failed to check auth');
        }

        const data = await response.json();

        console.log(data)
        return data;
    } catch (error) {
        console.error(error.message);
        return rejectWithValue(error?.message || 'An error occurred while checking authentication');
    }
});

export const signIn = createAsyncThunk('auth/signin', async (userDetails, {rejectWithValue}) => {
    // console.log(process.env.REACT_APP_API_URL);
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
            credentials: 'include'
        })

        if (!response.ok) {
            const data = await response.json();
            return rejectWithValue(data?.message || 'Failed to sign in');
        }

        const data = await response.json();

        // console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error.message == undefined ? 'An Error occurred during sign in' : error.message )
    }
});

export const signUp = createAsyncThunk('auth/signup', async (userDetails, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
            credentials: 'include'
        });

        if(!response.ok){
            const data = await response.json();
            return rejectWithValue(data?.message || 'Failed at sign up, Please try agian...')
        }

        const data = await response.json();

        // console.log(data);
        return data;
    } catch (error) {
        return rejectWithValue(error?.message || 'Failed at sign up, Please try agian...')
    }
});

export const logOut = createAsyncThunk('auth/logout', async (_, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        console.log(response);

        if(!response.ok) {
            return rejectWithValue('Error in logout');
        }

        const data = await response.json();
        return data

    } catch (error) {
        return rejectWithValue('Error in logout')
    }
});

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async(verificationDetails, {rejectWithValue}) => {

    console.log(verificationDetails);
    const {token} = verificationDetails;

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-email/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(verificationDetails)
        });

        if(!response.ok){
            const data = await response.json();
            return rejectWithValue(data?.message || 'Error in Verifying the Email')
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        return rejectWithValue(error?.message || 'Failed to send otp, Please try again..');
    }
});

export const forgotPassword = createAsyncThunk('auth/forgotpassword', async(email, {rejectWithValue}) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(email),
        });

        if(!response.ok) {
            const data = await response.json();
            return rejectWithValue(data?.message || 'Error in forgot password')
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error?.message || 'Failed to send request for Forgot password');
    }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (resetPassDetails, {rejectWithValue}) => {
    const {token} = resetPassDetails;
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resetPassDetails),
            credentials: 'include'
        })

        if(!response.ok){
            const data = await response.json();
            return rejectWithValue(data?.message || 'Error in reseting teh password');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error?.message || 'Failed to reset Password, Please try again');
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
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.isLoading = true
                state.error = false
                state.errMessage = null
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(signIn.rejected, (state,action) => {
                state.isLoading = false
                state.error = true
                state.errMessage = action.payload
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated  = true
                state.user = action.payload.user
                state.error = false
                state.errMessage = null
            })
            .addCase(signUp.pending, (state) => {
                state.isLoading = true
                state.error = false
                state.errMessage = null
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
                state.errMessage = action.payload
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = null
                state.error = false
                state.user = action.payload.user
                state.isAuthenticated = false
            })
            .addCase(logOut.pending, (state, action) => {
                state.isLoading = true
                state.errMessage = null
                state.error = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload
                state.error = true
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = null
                state.error = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.isLoading = true
                state.errMessage = null
                state.error = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload
                state.error = true
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = null
                state.error = false
                state.user = action.payload.user
                state.isAuthenticated = action.payload?.isAuthenticated || true
            }).addCase(verifyEmail.pending, (state, action) => {
                state.isLoading = true
                state.errMessage = null
                state.error = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload
                state.error = true
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = null
                state.error = false
                state.user = action.payload.user
                state.isAuthenticated = true
            })
            .addCase(forgotPassword.pending, (state, action) => {
                state.isLoading = true
                state.errMessage = null
                state.error = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload
                state.error = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = null
                state.error = false
                state.user = action.payload.user
                state.isAuthenticated = false
            })
            .addCase(resetPassword.pending, (state, action) => {
                state.isLoading = true
                state.errMessage = null
                state.error = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.errMessage = action.payload
                state.error = true
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.errMessage = null
                state.error = false
                state.user = action.payload.user
                state.isAuthenticated = true
            })
    }
})

export default authSlice.reducer

