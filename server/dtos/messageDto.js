const MessageFileDto = require("./messageFilesDto");
module.exports = class MessageDto {
  constructor(model) {
    this.id = model.id;
    this.chat_id = model.chat_id;
    this.sender_id = model.sender_id;

    this.content = model.content;

    this.reply_to_id = model.reply_to_id;

    this.sent_at = model.sent_at;
    this.edited_at = model.edited_at;
    this.deleted_at = model.deleted_at;

    this.is_read = model.is_read;

    this.sender = model.sender
      ? {
          id: model.sender.id,
          username: model.sender.username,
          avatar_url: model.sender.avatar_url,
        }
      : null;

    this.replyTo = model.replyTo
      ? {
          id: model.replyTo.id,
          senderId: model.replyTo.sender_id,
          senderName: model.replyTo.sender?.username,
          content: model.replyTo.content,
          attachedFiles:
            model.replyTo.attachedFiles?.map(
              (file) => new MessageFileDto(file),
            ) ?? [],
        }
      : null;

    this.attachedFiles =
      model.attachedFiles?.map((file) => new MessageFileDto(file)) ?? [];
  }
};
