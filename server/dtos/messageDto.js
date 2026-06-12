
module.exports = class MessageDto {
  id;
  chat_id;
  sender_id;
  content;
  reply_to_id;
  sent_at;
  edited_at;
  deleted_at;
  is_read;

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
  };
};