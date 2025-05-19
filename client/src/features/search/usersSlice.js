import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../../http";

const initialState = {
    searchUsersResult: [],
    error: null,
    isLoading: false
}


export const searchUsers = createAsyncThunk('searchUsers', 
    async(query, {rejectWithValue}) => {
        try {
            const response = await $api.get(`/search?query=${encodeURIComponent(query)}`);
            return response.data;
        } catch(e) {
            console.log("error", e)
            return rejectWithValue(e.response?.data?.message || "user not found");
        }
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearSearchUsers (state) {
            state.searchUsersResult = [];
            state.error = null;
        },
        clearError(state) {
            state.error = null;
        }
    }, 
    extraReducers: (builder) => {
        builder
          .addCase(searchUsers.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(searchUsers.fulfilled, (state, action) => {
            state.searchUsersResult = action.payload;
            state.isLoading = false;
          })
          .addCase(searchUsers.rejected, (state, action) => {
            state.searchUsersResult = [];
            state.isLoading = false;
            state.error = action.payload;
          });
      }
})

export const { clearError, clearSearchUsers } = usersSlice.actions;
export default usersSlice.reducer;