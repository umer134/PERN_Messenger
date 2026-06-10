import { MessageGroupVM, MessageVM } from "../model/message.types";

export const groupMessages = (
  messages: MessageVM[],
): MessageGroupVM[] => {
  const groups: MessageGroupVM[] = [];

  for (const msg of messages) {
    const last = groups[groups.length - 1];

    if (last?.senderId === msg.senderId) {
      last.messages.push(msg);
    } else {
      groups.push({
        senderId: msg.senderId,
        messages: [msg],
      });
    }
  }

  return groups;
};