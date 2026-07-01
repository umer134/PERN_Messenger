import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth';
import { currentUserReducer } from '@/entities/current-user';
import { messageActionsReducer } from '@/features/message-actions';
import { messageNavigationReducer } from '@/features/navigation/';
import { typingReducer } from '@/features/typing/';
import { presenceReducer } from '@/features/presence';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currentUser: currentUserReducer,
    messageActions: messageActionsReducer,
    messageNavigation: messageNavigationReducer,
    typing: typingReducer,
    presence: presenceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
