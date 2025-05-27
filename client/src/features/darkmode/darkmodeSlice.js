import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem('theme') || 'light'
};

const darkmodeSlice = createSlice({
    name: 'darkmode',
    initialState,   
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export const { setTheme } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;