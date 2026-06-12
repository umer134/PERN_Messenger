/* AUTO-GENERATED FILE */

export interface User {
  id: string;
  name: string;
  avatar: string | null;
}

export interface ChatMemberPreview {
  id: string;
  name: string;
  avatar: string | null;
}

export interface ChatFile {
  file_path: string;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  sender_id: string | null;
  content: string | null;
  sent_at: string;
  is_read: boolean;
}

export interface ChatMessageWithRelations {
  id: string;
  chat_id: string;
  sender_id: string | null;
  content: string | null;
  sent_at: string;
  is_read: boolean;
  sender: User;
  attachedFiles: ChatFile[];
}

export interface Chat {
  id: string;
  is_group: boolean;
  group_name: string | null;
  group_avatar: string | null;
  created_at: string;
  members: ChatMemberPreview[];
  messages: ChatMessage[];
}

export interface MessagesPage {
  messages: ChatMessageWithRelations[];
  nextCursor: string | null;
}

export interface CreateChatRequest {
  userId: string;
}

export interface SendMessageRequest {
  content: string | null;
  files: FileList | null;
}

export interface ReadMessageResponse {
  updated: number;
}

