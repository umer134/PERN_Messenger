import { MessageResponse } from "./message.model";
import { MessageAttachmentVM, MessageVM } from "./message.types";

export class MessageAdapter {
  static getAttachmentType(path: string): MessageAttachmentVM["type"] {
    const ext = path.split(".").pop()?.toLowerCase();

    if (!ext) return "file";

    if (
      ["jpg", "jpeg", "png", "gif", "webp"].includes(ext)
    ) {
      return "image";
    }

    if (
      ["mp4", "webm", "mov"].includes(ext)
    ) {
      return "video";
    }

    if (
      ["mp3", "wav", "ogg"].includes(ext)
    ) {
      return "audio";
    }

    return "file";
  }

  static toVM(message: MessageResponse): MessageVM {
    return {
      id: message.id,

      chatId: message.chat_id,

      senderId: message.sender_id || null,

      content: message.content || null,

      sentAt: message.sent_at,

      isRead: message.is_read,

      status: message.is_read ? "read" : "sent",

      attachments:
        message.attachedFiles?.map(file => ({
          id: file.file_path,
          type: MessageAdapter.getAttachmentType(file?.file_path || ''),
          url: file.file_path,
          name: file.file_path.split("/").pop() || "file",
        })) ?? [],
    };
  }

}