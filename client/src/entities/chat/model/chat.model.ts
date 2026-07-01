import { paths } from '@/shared/api/schema';

export type ChatResponse =
  paths['/api/chats']['get']['responses']['200']['content']['application/json'][number];
