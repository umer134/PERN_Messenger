
exports.module = class MessageFilesDto {
  id;
  message_id;
  file_path;

  constructor(model) {
    this.id = model.id;
    this.message_id = model.message_id;
    this.file_path = model.file_path;
  };
};