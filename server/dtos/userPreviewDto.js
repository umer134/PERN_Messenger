module.exports = class UserPreviewDto {
  constructor(model) {
    this.id = model.id;

    this.username = model.username;

    this.avatar = model.avatar || model.avatar_url || null;

    this.lastSeen = model.last_seen || null;
  }
};
