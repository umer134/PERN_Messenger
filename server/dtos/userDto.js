module.exports = class UserDTO {
  id;
  username;
  avatar;
  lastSeen;

  constructor (model) {
    this.id = model.id;
    this.username = model.username;
    this.avatar = model.avatar;
    this.lastSeen = model.last_seen;
  }
}