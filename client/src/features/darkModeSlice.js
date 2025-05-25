import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem('theme') || 'light'
};

const toggleThemeSlice = createSlice({
    name: 'toggleTheme',
    initialState,   
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const { setTheme } = toggleThemeSlice.actions;
export default toggleThemeSlice.reducer;