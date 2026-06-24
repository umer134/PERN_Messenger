// useTypingCleanup.ts
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { removeTypingUser } from '../model/typing.slice';

export const useTypingCleanup = () => {
  const dispatch = useAppDispatch();

  const chats = useAppSelector((state) => state.typing.chats);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      Object.entries(chats).forEach(([chatId, users]) => {
        users.forEach((user) => {
          if (now - user.lastActivity > 5000) {
            dispatch(
              removeTypingUser({
                chatId,
                userId: user.userId,
              }),
            );
          }
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [chats]);
};
