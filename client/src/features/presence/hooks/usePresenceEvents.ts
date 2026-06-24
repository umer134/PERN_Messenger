import { useEffect } from 'react';

import { useAppDispatch } from '@/app/hooks';

import {
  subscribePresenceOnline,
  subscribePresenceOffline,
  subscribePresenceInit,
} from '@/shared/socket/listeners/presence.listeners';

import {
  userOnline,
  userOffline,
  setOnlineUsers,
} from '../model/presence.slice';

export const usePresenceEvents = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initHandler = ({ users }) => {
      dispatch(setOnlineUsers(users));
    };

    const onlineHandler = ({ userId }) => {
      console.log('ONLINE EVENT', userId);
      dispatch(
        userOnline({
          userId,
        }),
      );
    };

    const offlineHandler = ({ userId, lastSeen }) => {
      console.log('OFFLINE EVENT', userId, lastSeen);
      dispatch(
        userOffline({
          userId,
          lastSeen,
        }),
      );
    };

    const unsubOnline = subscribePresenceOnline(onlineHandler);

    const unsubOffline = subscribePresenceOffline(offlineHandler);

    const unsubInit = subscribePresenceInit(initHandler);

    return () => {
      unsubInit();
      unsubOnline();
      unsubOffline();
    };
  }, []);
};
