module.exports = class UserDTO {
  id;
  name;
  avatar;

  constructor (model) {
    this.id = model.id;
    this.name = model.username;
    this.avatar = model.avatar_url;
  }
}