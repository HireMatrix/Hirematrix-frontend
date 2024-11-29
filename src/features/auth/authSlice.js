import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/check-auth', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(data);
            return rejectWithValue(data.message || 'Failed to check auth');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error.message);
        return rejectWithValue(error?.message || 'An error occurred while checking authentication');
    }
});

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
            return rejectWithValue(data?.message || 'Failed to sign in');
        }

        const data = await response.json();
        const {_id, email, name, isVerified} = data?.user;
        localStorage.setItem('userDetails', JSON.stringify({user : {id: _id, email: email, name: name, isVerified: isVerified}, isAuthenticated: true}));
        return data;
    } catch (error) {
        return rejectWithValue(error.message == undefined ? 'An Error occurred during sign in' : error.message )
    }
});

export const signUp = createAsyncThunk('auth/signup', async (userDetails, {rejectWithValue}) => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(userDetails)
        });

        if(!response.ok){
            const data = await response.json();
            return rejectWithValue(data?.message || 'Failed at sign up, Please try agian...')
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue(error?.message || 'Failed at sign up, Please try agian...')
    }
});

const initialState = {
    user: JSON.parse(localStorage.getItem('userDetails'))?.user || null,
    isAuthenticated: JSON.parse(localStorage.getItem('userDetails'))?.isAuthenticated || false,
    error: false,
    errMessage: null,
    isLoading: false,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.error = false
            state.errMessage = null
            state.isLoading = false
            localStorage.removeItem('userDetails')
        }
    },
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
                state.user = JSON.parse(localStorage.getItem('userDetails'))?.user
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
                state.user = action.payload
                state.isAuthenticated = true
            })
    }
})

export const {
    logOut
} = authSlice.actions

export default authSlice.reducer

