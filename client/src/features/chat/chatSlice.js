import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatId: null,
    userId: null,
    activeChatId: null,
    activeChatUserId: null,
    isRead_indicator: false,
}

export const chatSlice = createSlice({
    name: "chat",
    initialState,

    reducers: {

        setChatId: (state, action) => {
            state.chatId = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setActiveChatId: (state, action) => {
            state.activeChatId = action.payload;
        },
        setActiveChatUserId: (state, action) => {
            state.activeChatUserId = action.payload;
        },
        setIsReadIndicator: (state, action) => {
            state.isRead_indicator = action.payload;
        },
        clearChatState: (state) => {
            state.chatId = null;
            state.userId = null;
            state.activeChatId = null;
            state.activeChatUserId = null;
            state.isRead_indicator = false;
        }
    }
})

export default chatSlice.reducer;
export const { setChatId,
     setUserId,
     setActiveChatId,
     setActiveChatUserId,
    isRead_indicator,
    setIsReadIndicator, clearChatState } = chatSlice.actions;