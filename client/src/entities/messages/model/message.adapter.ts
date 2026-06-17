import { MessageResponse } from "./message.model";
import { MessageAttachmentVM, MessageStatus, MessageVM } from "./message.types";
import { resolveMediaUrl } from "../../../shared/lib/media/resolveMediaUrl";
import { resolveAttachmentTypeFromPath } from "../lib/resolveAttachmentType";

export class MessageAdapter {
  static resolveStatus(message: MessageResponse): MessageStatus {
    if (message.is_read) {
      return "read";
    }

    return "sent";
  }

  static toVM(message: MessageResponse): MessageVM {
    return {
      id: message.id,

      chatId: message.chat_id,

      senderId: message.sender_id || null,

      content: message.content || null,

      sentAt: message.sent_at,

      isRead: message.is_read,

      status: MessageAdapter.resolveStatus(message),

      attachments:
        message.attachedFiles?.map(file => ({
          id: file.file_path,
          type: resolveAttachmentTypeFromPath(file?.file_path || ""),
          url: resolveMediaUrl(file.file_path),
          name: file.file_path.split("/").pop() || "file",
        })) ?? [],
    };
  }
}
