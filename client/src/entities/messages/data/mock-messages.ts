import { MessageVM } from "../model/message.types";

export const mockMessages: MessageVM[] = [
  {
    id: "1",

    chatId: '1',

    senderId: "alex",

    content: "Hey",

    attachments: [],

    sentAt: "15:30",

    isRead: true,

    status: 'sent'


  },

  {
    id: "2",

    chatId: '1',

    senderId: "me",

    content: "Hi",

    attachments: [
      {
        id: "voice-1",
        type: 'voice',
        name: 'deep_vibe_sad',
        duration: 14,
        url: './deep_vibe_sad.mp3',
      }
    ],

    sentAt: "15:31",

    isRead: true,

    status: 'read'
  },

  {
    id: "3",
    senderId: "alex",

    chatId: '1',

    content: "Look at this",

    attachments: [
      {
        id: "file-1",
        name: 'image_1',
        type: 'image',
        url: "https://github.com/umer134/PERN_Messenger/raw/master/manual_photos/chatScreenSignUp.png",
      },
    ],

    sentAt: "15:32",

    isRead: true,

    status: 'sent'
  },
];