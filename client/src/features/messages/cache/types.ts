import type { InfiniteData } from '@tanstack/react-query';
import { MessagesPage } from '@/entities';

export type MessagesCache = InfiniteData<MessagesPage>;
