import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import chatReducer from "../features/chat/chatSlice";
import searchUsersReducer from "../features/search/usersSlice";
import toggleThemeReducer from "../features/darkModeSlice";
import { chatApi } from "../features/chat/chatApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        searchUsers: searchUsersReducer,
        [chatApi.reducerPath]: chatApi.reducer,
        chat: chatReducer,
        theme: toggleThemeReducer,
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(chatApi.middleware)
    }
})

