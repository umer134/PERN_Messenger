import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../../features/auth/model/authSlice';
import currentUserReducer from '../../entities/current-user/model/currentUser.slice';
import profileReducer from '../../features/profile/profileSlice';
import { profileApi } from '../../features/profile/profileApi';
import chatReducer from "../../features/chat/chatSlice";
import searchUsersReducer from "../../features/search/usersSlice";
// import darkmodeReducer from "../features/darkmode/darkmodeSlice";
import { chatApi } from "../../features/chat/chatApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        currentUser: currentUserReducer,
        [profileApi.reducerPath]: profileApi.reducer,
        searchUsers: searchUsersReducer,
        [chatApi.reducerPath]: chatApi.reducer,
        chat: chatReducer,
        // theme: darkmodeReducer,
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(profileApi.middleware, chatApi.middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

