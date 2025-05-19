import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import chatReducer from "../features/chat/chatSlice";
import searchUsersReducer from "../features/search/usersSlice";
import { chatApi } from "../features/chat/chatApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        searchUsers: searchUsersReducer,
        [chatApi.reducerPath]: chatApi.reducer,
        chat: chatReducer
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(chatApi.middleware)
    }
})

