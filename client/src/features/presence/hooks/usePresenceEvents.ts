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
import { UserPreview } from '@/entities';

export const usePresenceEvents = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initHandler = ({ users }: { users: UserPreview[] }) => {
      dispatch(setOnlineUsers(users));
    };

    const onlineHandler = ({ userId }: { userId: string }) => {
      dispatch(
        userOnline({
          userId,
        }),
      );
    };

    const offlineHandler = ({
      userId,
      lastSeen,
    }: {
      userId: string;
      lastSeen: Date;
    }) => {
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
