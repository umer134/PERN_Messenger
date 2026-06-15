import { MessageGroupVM, MessageVM } from "../model/message.types";

// groupMessages.ts
export const groupMessages = (messages: MessageVM[]): MessageGroupVM[] => {
  // ✅ Проверка на входные данные
  if (!messages || !Array.isArray(messages)) {
    return [];
  }

  const groups: MessageGroupVM[] = [];

  for (const msg of messages) {
    // ✅ Пропускаем некорректные сообщения
    if (!msg || !msg.senderId) {
      continue;
    }

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