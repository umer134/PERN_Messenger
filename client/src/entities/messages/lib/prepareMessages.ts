import { MessageVM } from '../model/message.types';

export const prepareMessages = (messages: MessageVM[]): MessageVM[] => {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages.map((message, index) => {
    const prev = messages[index - 1];
    const next = messages[index + 1];

    const sameAsPrev = prev && prev.senderId === message.senderId;

    const sameAsNext = next && next.senderId === message.senderId;

    let groupPosition: 'single' | 'first' | 'middle' | 'last';

    if (!sameAsPrev && !sameAsNext) {
      groupPosition = 'single';
    } else if (!sameAsPrev && sameAsNext) {
      groupPosition = 'first';
    } else if (sameAsPrev && sameAsNext) {
      groupPosition = 'middle';
    } else {
      groupPosition = 'last';
    }

    return {
      ...message,
      groupPosition,
    };
  });
};
