module.exports = class UserDTO {
  id;
  username;
  avatar;

  constructor (model) {
    this.id = model.id;
    this.username = model.username;
    this.avatar = model.avatar;
  }
}