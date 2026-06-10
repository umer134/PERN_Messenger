import { MessageVM } from "../../messages/model/message.types";

export type ConversationVM = {
  id: string;

  title: string;

  avatar?: string;

  isGroup: boolean;

  membersCount?: number;

  isOnline?: boolean;

  messages: MessageVM[];
};