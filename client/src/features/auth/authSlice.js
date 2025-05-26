import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chatApi } from "../chat/chatApi";
import { clearChatState } from "../chat/chatSlice";
import { clearProfile, setProfile } from "../profile/profileSlice";
import $api from "../../http";

const initialState = {
    user: null,
    token: null,
    isLoading: null,
    error: null,
};

export const login = createAsyncThunk('login', 
    async({email, password}, {rejectWithValue, dispatch}) => {
        try {
            const response = await $api.post('/login', {email, password});
            dispatch(setProfile(response.data.user));
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Authorization error');
        }
    }
)

export const registration = createAsyncThunk('registration', 
    async(formData, {rejectWithValue, dispatch}) => {
        try {
            const response = await $api.post('/registration', formData);
            dispatch(setProfile(response.data.user));
            return response.data;
        } catch(e) {
            return rejectWithValue(e.response?.data?.message || "registration error");
        }
    }
)

export const checkAuth = createAsyncThunk('refresh', 
    async(_, {rejectWithValue, dispatch}) => {
        try {
            const response = await $api.get('/refresh');
            dispatch(setProfile(response.data.user));
            return response.data;
        } catch(e) {
            return rejectWithValue(e.response?.data?.message || "auth error");
        }
    }
)

export const logoutUser = createAsyncThunk('logoutUser', 
    async(_, {dispatch, rejectWithValue}) => {
        try {
            const response = await $api.post('/logout');
            dispatch(chatApi.util.resetApiState());
            dispatch(clearChatState());
            dispatch(clearProfile());
            window.location.href = '/login'
            return response.data;
        } catch(e) {
            return rejectWithValue(e.response?.data?.message || "undefined error");
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        
        .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            localStorage.setItem('token', action.payload.accessToken);
            localStorage.setItem('user_id', action.payload.user.id);
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "error";
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            localStorage.setItem('token', action.payload.accessToken); 
            localStorage.setItem('user_id', action.payload.user.id);
            })
        .addCase(registration.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            localStorage.setItem('token', action.payload.accessToken);
            localStorage.setItem('user_id', action.payload.user.id);
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addMatcher(
            (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending') && !action.type.includes('checkAuth'),
            (state) => {
                state.isLoading = true;
                state.error = null;
            }
        )
        .addMatcher(
            (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected') && !action.type.includes('checkAuth'),
            (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "error"
            }
        );
    },
})

export const {logout, clearError, setUser} = authSlice.actions;
export default authSlice.reducer;