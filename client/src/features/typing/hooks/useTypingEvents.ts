import { useEffect } from 'react';

import { useAppDispatch } from '@/app/hooks';

import { addTypingUser, removeTypingUser } from '../model/typing.slice';

import {
  subscribeTypingStart,
  subscribeTypingStop,
} from '@/shared/socket/listeners/typing.listeners';

type Props = {
  chatId: string;
  userId: string;
  username?: string;
};

export const useTypingEvents = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const startHandler = ({ chatId, userId, username }: Props) => {
      dispatch(addTypingUser({ chatId, userId, username }));
    };

    const stopHandler = ({ chatId, userId }: Props) => {
      dispatch(removeTypingUser({ chatId, userId }));
    };

    const unsubStart = subscribeTypingStart(startHandler);

    const unsubStop = subscribeTypingStop(stopHandler);

    return () => {
      unsubStart();
      unsubStop();
    };
  }, []);
};
