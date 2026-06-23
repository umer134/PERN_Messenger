import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../../features/auth/model/authSlice';
import currentUserReducer from '../../entities/current-user/model/currentUser.slice';
import profileReducer from '../../features/profile/profileSlice';
import { profileApi } from '../../features/profile/profileApi';
import chatReducer from "../../features/chat/chatSlice";
import searchUsersReducer from "../../features/search/usersSlice";
import messageActionsReducer from '../../features/message-actions/model/message-actions.slice';
// import darkmodeReducer from "../features/darkmode/darkmodeSlice";
import { chatApi } from "../../features/chat/chatApi";
import messageNavigationReducer from '../../features/navigation/message-navigation/model/message-navigation.slice';
import typingReducer  from '../../features/typing/model/typing.slice';
import presenceReducer from "../../features/presence/model/presence.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        currentUser: currentUserReducer,
        [profileApi.reducerPath]: profileApi.reducer,
        searchUsers: searchUsersReducer,
        [chatApi.reducerPath]: chatApi.reducer,
        chat: chatReducer,
        messageActions: messageActionsReducer,
        messageNavigation: messageNavigationReducer,
        typing: typingReducer,
        presence: presenceReducer,
        // theme: darkmodeReducer,
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(profileApi.middleware, chatApi.middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

