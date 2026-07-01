import { InfiniteData } from '@tanstack/react-query';
import { MessageVM } from '@/entities/messages/model/message.types';

type MessagesPage = {
  messages: MessageVM[];
  nextCursor: string | null;
  hasMore: boolean;
};

type MessagesCache = InfiniteData<MessagesPage>;
