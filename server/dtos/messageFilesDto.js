module.exports = class MessageFilesDto {
  constructor(model) {
    this.file_path = model.file_path;
    this.type = model.type;
  }
};
