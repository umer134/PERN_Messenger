import { paths } from "../../../shared/api/schema";

export type MessageResponse = paths['/api/chats/{chatId}/messages']['get']['responses']['200']['content']['application/json']['messages'][number];

export type MessageSendDto = paths['/api/chats/{chatId}/messages']['post']['requestBody']['content']['multipart/form-data'];

export type MessageSendResponse = paths['/api/chats/{chatId}/messages']['post']['responses']['200']['content']['application/json'];

export type MessageEditDto = paths['/api/messages']['put']['requestBody']['content']['application/json'];

export type MessageEditResponse = paths['/api/messages']['put']['responses']['200']['content']['application/json'];

export type DirectMessageSendDto = paths['/api/messages']['post']['requestBody']['content']['multipart/form-data'];

export type DirectMessageSendResponse = paths['/api/messages']['post']['responses']['200']['content']['application/json'];