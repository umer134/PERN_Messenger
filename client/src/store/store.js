import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import chatReducer from "../features/chat/chatSlice";
import searchUsersReducer from "../features/search/usersSlice";
import darkmodeReducer from "../features/darkmode/darkmodeSlice";
import { chatApi } from "../features/chat/chatApi";
import { profileApi } from '../features/profile/profileApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        [profileApi.reducerPath]: profileApi.reducer,
        searchUsers: searchUsersReducer,
        [chatApi.reducerPath]: chatApi.reducer,
        chat: chatReducer,
        theme: darkmodeReducer,
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(chatApi.middleware, profileApi.middleware)
    }
})

